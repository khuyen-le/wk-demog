//CONSENT
//TODO: make specific instruction for this experiment clearer (larger font)
first_page_instruction =
        [`
        <div style="text-align:left;
                  line-height:normal;
                  padding-left:10%;
                  padding-right:10%">
        <p>This experiment is being conducted by researchers at UC San Diego Language
        and Development Lab. Before you decide to participate, please read the following information carefully:</p>
        <br>
        <p>In this study, you will be shown some characters and answer questions about them.<p>

      <p>If you have previously completed this study or a similar one, please inform the researcher. 
        We expect the study to last approximately 10 minutes, 
        including the time it takes to read instructions.</p>`]

consent_form = [`
      <div style="text-align:left;
                  line-height:normal;
                  padding-left:10%;
                  padding-right:10%">
      <p><b><u>Please click 'Next' if you consent to participate in this experiment:</u></b></p>
      <p>This study is part of a larger project that is exploring children's 
      cognitive development. Therefore, the study will use a simple design 
      that will allow us to compare your adult judgments to those of children. 
      You will be asked to play a game that involves making simple judgments 
      about images, words, or quantities.</p>
      <p>By answering the questions in this study, you consent to participate
        in research conducted by Professor David Barner at the University of 
        California, San Diego. If you have any questions about the study, you 
        may reach our lab at <a href="mailto:ladlab.ucsd@gmail.com">ladlab.ucsd@gmail.com</a>
        You may also call the Human Research Protections Program at (858) 246-4777 
        for more information about your rights as a research subject, or to 
        report research-related problems.</p>
      <p>Participation in research is entirely voluntary and has no known risks 
        associated with it. You may refuse to participate or withdraw at any time. 
        Research records will be kept confidential. To ensure anonymity, we will 
        not collect any identifying information from you. All information that 
        we do collect from you will be identified with a subject number and will 
        be referenced exclusively by this number in data collection and analyses. 
        You must be at least 18 years of age to participate.</p>

        <p>Title: Quantification and Language Development. PI: David Barner. 
        IRB Protocol #171652. Approved: May 02, 2022 01:31PM PDT.</p>
        </div>
        `]

// FAIL
//FULL SCREEN INSTR
fullscreen_instr = "This study requires the browser to be in fullscreen. Please click the below button to go into fullscreen mode.<br>"
fullscreen_thanks = 'Thank you! Please do not exit fullscreen mode until the end of the study.'

//AUDIO
audio_instr = `This study contains audio. Please confirm that your computer's sound is ON, 
               and that you will be able to listen to audio without disruption.
               <br>
               Please click the below button to confirm.`

//EARLY END INST
early_end_instr = `<h1>Thank you for participating in the study.</h1>
                <p>In this study, we used a comprehension check to make sure you understand
                the instructions that are necessary to complete the rest of the study.
                Unfortunately, you did not complete the comprehension check within the number 
                of tries we require.</p>
                <p>Therefore, we ask that you <b>exit the study and return the submission</b>.
                Your data will not be used for any future reports or publications of this study. 
                We really value your time, and please reach out through Prolific if you have any concerns.</p>`

///////////////////////// demog questions /////////////////////////
demog_instr = ["Finally, we would like to ask a few questions about you. Your answers will remain confidential."]
demog_require_answer = '<p style="font-size:small;">Questions marked with <font color="brown">*</font> require response.</p>'
label_done = "Done!"


demog_current_country_instr = `Where do you currently live? Choose a country from the dropdown menu.`
demog_language_first_instr = "Is English your first language (or one of your first languages)?"
demog_language_others_instr = `What other language(s) can you speak or understand at all, even if you aren't fluent?
                              </br><p style="font-size:small">If you can speak or understand multiple other languages, you 
                                will have the opportunity to answer this question multiple times.<br>Please leave the answer 
                                blank and click 'Continue' once you have answered with all the languages you can speak or understand.<p>` 
demog_language_first_opts = ["Yes", "No"]
demog_language_others_fluency_sp = "On a scale from 0 to 10, please select your level of proficiency in speaking "
demog_language_others_fluency_ud = "On a scale from 0 to 10, please select your level of proficiency in understanding "
demog_language_others_fluency_opts = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

demog_age_instr = "What is your age?"
demog_age_opts = ["18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100"]
demog_gender_instr = "What is your gender?"
demog_gender_opts = ["Female", "Male", "Non-binary", "Decline to answer"]
demog_ethnic_instr = `What is your racial or ethnic identification? <p style="font-size:small">Please select all that apply.</p>`
demog_ethnic_opts = ["American Indian or Alaska Native", "Asian", "Black or African American", "Hispanic or Latino", "Middle Eastern or North African", "Native Hawaiian or Pacific Islander", "White", "Other"]


demog_objective_ses_instr = `What is the highest degree or level of school you have completed?`
demog_objective_ses_opts = ['8th grade/junior high or less', 'Some high school', 'High school graduate/GED', 'One or more years of college, no degree', 'Two-year college degree/vocational school', "Four-/Five-year college Bachelor's degree", 'At least some graduate school']

demog_final_feedback_instr = "Were any parts of this experiment confusing?<p></p>We highly appreciate your feedback!"
demog_meta_instr = "How did you choose which character knows each word? When both characters provided different names for a new object, how did you decide the name of that object?"

demog_pid_instr = `Please enter the last 4 digits of your PID. We will use this to verify your responses.<font color="brown">*</font>`

////////////////////// demog questions end ////////////////////////