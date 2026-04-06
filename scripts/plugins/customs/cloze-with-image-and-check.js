/** This plugin extends jsPsychCloze to provide ability to include an
 *  image with the cloze text and more flexible text checking 
 *  (for e.g. check whether numbers have been used) */
var customClozeWithImageAndCheck = (function (jspsych) {
    'use strict';

    const info = {
        name: "cloze",
        parameters: {
            /** The cloze text to be displayed. Blanks are indicated by %% signs and automatically replaced by input fields. If there is a correct answer you want the system to check against, it must be typed between the two percentage signs (i.e. %solution%). */
            text: {
                type: jspsych.ParameterType.HTML_STRING,
                pretty_name: "Cloze text",
                default: undefined,
            },
            /** Text of the button participants have to press for finishing the cloze test. */
            button_text: {
                type: jspsych.ParameterType.STRING,
                pretty_name: "Button text",
                default: "OK",
            },
            /** Boolean value indicating if the answers given by participants should be compared against a correct solution given in the text (between % signs) after the button was clicked. */
            check_answers: {
                type: jspsych.ParameterType.BOOL,
                pretty_name: "Check answers",
                default: false,
            },
            /** Boolean value indicating if the participant may leave answers blank. */
            allow_blanks: {
                type: jspsych.ParameterType.BOOL,
                pretty_name: "Allow blanks",
                default: true,
            },
            /** Function called if either the check_answers is set to TRUE or the allow_blanks is set to FALSE and there is a discrepancy between the set answers and the answers provide or if all input fields aren't filled out, respectively. */
            mistake_fn: {
                type: jspsych.ParameterType.FUNCTION,
                pretty_name: "Mistake function",
                default: () => { },
            },
            /** Image displayed if provided */
            image: {
                type: jspsych.ParameterType.IMAGE,
                pretty_name: "Image",
                default: undefined,
            },
            /** Set the image height in pixels */
            image_height: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Image height",
                default: null,
            },
            /** Set the image width in pixels */
            image_width: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Image width",
                default: null,
            },
            /** Maintain the aspect ratio after setting width or height */
            maintain_aspect_ratio: {
                type: jspsych.ParameterType.BOOL,
                pretty_name: "Maintain aspect ratio",
                default: true,
            },
            /** Boolean value indicating if the answer provided should be validated */
            validate_answers: {
                type: jspsych.ParameterType.BOOL,
                pretty_name: "Validate answers",
                default: false,
            },
            /** Function called to check if provided answer meets requirement */
            validate_answers_fn: {
                type: jspsych.ParameterType.FUNCTION,
                pretty_name: "Validate answer function",
                default: () => { },
            }
        },
    };
    /**
     * **cloze**
     *
     * jsPsych plugin for displaying a cloze test and checking participants answers against a correct solution
     *
     * @author Philipp Sprengholz
     * @see {@link https://www.jspsych.org/plugins/jspsych-cloze/ cloze plugin documentation on jspsych.org}
     */
    class ClozeWithImageAndCheckPlugin {
        constructor(jsPsych) {
            this.jsPsych = jsPsych;
        }
        trial(display_element, trial) {
            var html = '<div class="cloze">';
            var height, width;
            // display stimulus as an image element
            html += '<img src="' + trial.image + '" id="cloze-image">';
            // odd elements are text, even elements are the blanks
            html += '<div class="cloze-text">';
            var elements = trial.text.split("%");
            const solutions = this.getSolutions(trial.text);
            let solution_counter = 0;
            for (var i = 0; i < elements.length; i++) {
                if (i % 2 === 0) {
                    html += elements[i];
                }
                else {
                    html += `<input type="text" id="input${solution_counter}" value="">`;
                    solution_counter++;
                }
            }
            html += "</div>";
            html += "</div>";
            display_element.innerHTML = html;
            // set image dimensions after image has loaded (so that we have access to naturalHeight/naturalWidth)
            var img = display_element.querySelector("#cloze-image");
            if (trial.image_height !== null) {
                height = trial.image_height;
                if (trial.image_width == null && trial.maintain_aspect_ratio) {
                    width = img.naturalWidth * (trial.image_height / img.naturalHeight);
                }
            }
            else {
                height = img.naturalHeight;
            }
            if (trial.image_width !== null) {
                width = trial.image_width;
                if (trial.image_height == null && trial.maintain_aspect_ratio) {
                    height = img.naturalHeight * (trial.image_width / img.naturalWidth);
                }
            }
            else if (!(trial.image_height !== null && trial.maintain_aspect_ratio)) {
                // if stimulus width is null, only use the image's natural width if the width value wasn't set
                // in the if statement above, based on a specified height and maintain_aspect_ratio = true
                width = img.naturalWidth;
            }
            img.style.height = height.toString() + "px";
            img.style.width = width.toString() + "px";

            const check = () => {
                var answers = [];
                var answers_correct = true;
                var answers_filled = true;
                var answers_valid = true;
                for (var i = 0; i < solutions.length; i++) {
                    var field = document.getElementById("input" + i);
                    answers.push(field.value.trim());
                }
                for (var i = 0; i < solutions.length; i++) {
                    if (trial.check_answers) {
                        if (answers[i] !== solutions[i]) {
                            field.style.color = "red";
                            answers_correct = false;
                        }
                        else {
                            field.style.color = "black";
                        }
                    }
                    if (!trial.allow_blanks) {
                        if (answers[i] === "") {
                            answers_filled = false;
                        }
                    }
                    if (trial.validate_answers) {
                        if (!trial.validate_answers_fn(answers[i])) {
                            field.style.color = "red";
                            answers_valid = false;
                        }
                        else {
                            field.style.color = "black";
                        }
                    }
                }
                
                if ((trial.check_answers && !answers_correct) || (!trial.allow_blanks && !answers_filled)) {
                    trial.mistake_fn();
                } else if (trial.validate_answers && !answers_valid) {
                    trial.invalid_fn();
                }
                else {
                    var trial_data = {
                        response: answers,
                    };
                    display_element.innerHTML = "";
                    this.jsPsych.finishTrial(trial_data);
                }
            };
            display_element.innerHTML +=
                '<br><button class="jspsych-html-button-response-button" type="button" id="finish_cloze_button">' +
                trial.button_text +
                "</button>";
            display_element.querySelector("#finish_cloze_button").addEventListener("click", check);
        }
        getSolutions(text) {
            const solutions = [];
            const elements = text.split("%");
            for (let i = 0; i < elements.length; i++) {
                if (i % 2 == 1) {
                    solutions.push(elements[i].trim());
                }
            }
            return solutions;
        }
        simulate(trial, simulation_mode, simulation_options, load_callback) {
            if (simulation_mode == "data-only") {
                load_callback();
                this.simulate_data_only(trial, simulation_options);
            }
            if (simulation_mode == "visual") {
                this.simulate_visual(trial, simulation_options, load_callback);
            }
        }
        create_simulation_data(trial, simulation_options) {
            const solutions = this.getSolutions(trial.text);
            const responses = [];
            for (const word of solutions) {
                if (word == "") {
                    responses.push(this.jsPsych.randomization.randomWords({ exactly: 1 }));
                }
                else {
                    responses.push(word);
                }
            }
            const default_data = {
                response: responses,
            };
            const data = this.jsPsych.pluginAPI.mergeSimulationData(default_data, simulation_options);
            //this.jsPsych.pluginAPI.ensureSimulationDataConsistency(trial, data);
            return data;
        }
        simulate_data_only(trial, simulation_options) {
            const data = this.create_simulation_data(trial, simulation_options);
            this.jsPsych.finishTrial(data);
        }
        simulate_visual(trial, simulation_options, load_callback) {
            const data = this.create_simulation_data(trial, simulation_options);
            const display_element = this.jsPsych.getDisplayElement();
            this.trial(display_element, trial);
            load_callback();
            const inputs = display_element.querySelectorAll('input[type="text"]');
            let rt = this.jsPsych.randomization.sampleExGaussian(750, 200, 0.01, true);
            for (let i = 0; i < data.response.length; i++) {
                this.jsPsych.pluginAPI.fillTextInput(inputs[i], data.response[i], rt);
                rt += this.jsPsych.randomization.sampleExGaussian(750, 200, 0.01, true);
            }
            this.jsPsych.pluginAPI.clickTarget(display_element.querySelector("#finish_cloze_button"), rt);
        }
    }
    ClozeWithImageAndCheckPlugin.info = info;

    return ClozeWithImageAndCheckPlugin;

})(jsPsychModule);
