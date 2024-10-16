// Check if the user is accessing the page on a mobile device
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

var audio = document.querySelectorAll("audio");
var audioList = document.querySelectorAll("audio");

var audioControlIcons = document.querySelectorAll("i.audio-control-icon");
let currentAudio = audioList[0];
let userAllowingAudio = false;

function audioToggle() {
    document.querySelectorAll("textarea")[0].click();

    if (userAllowingAudio) {
        for (let i in audioControlIcons) {
            if (typeof audioControlIcons[i].style !== "undefined") {
                audioControlIcons[i].style.opacity = "0.4";
                audioControlIcons[i].textContent = "Sound off";
            }
        }
        userAllowingAudio = false;
        currentAudio.pause();
    } else {
        userAllowingAudio = true;
        currentAudio.play();
        for (let i in audioControlIcons) {
            if (typeof audioControlIcons[i].style !== "undefined") {
                audioControlIcons[i].style.opacity = "1";
                audioControlIcons[i].textContent = "Sound on";

            }
        }
    }
}

function playAudio(track) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = audio[track];
    if (userAllowingAudio) {
        currentAudio.play();
    }
}
function pauseAudio() {
    currentAudio.pause()
}
$(function () {

    function is_object(val) {
        return Object.prototype.toString.call(val) === "[object Object]";
    }

    var term = $('#confessional').terminal(function (command, term) {
        var settings = {};
        var inquiries = [
            "TELL ME MORE?\n\nTYPE YOUR ANSWER. THEN PRESS RETURN", "CAN YOU BE MORE SPECIFIC?\n\nTYPE YOUR ANSWER. THEN PRESS RETURN", "DO YOU FEEL GUILTY?\n\nTYPE YOUR ANSWER. THEN PRESS RETURN", "DO YOU FEEL REMORSE?\n\nTYPE YOUR ANSWER. THEN PRESS RETURN", "WHY HAVE YOU SINNED?\n\nTYPE YOUR ANSWER. THEN PRESS RETURN"
        ]
        var penances = [
            "SAY TWO OUR FATHER'S AND ONE HAIL MARY.", "SAY TWO HAIL MARY'S AND ONE OUR FATHER.", "SAY THREE HAIL MARY'S AND TWO OUR FATHER'S."
        ]
        var questions = [
            {
                name: "start",
                text: 'IN THE NAME OF THE FATHER, AND OF THE SON, AND OF THE HOLY SPIRIT.\nAMEN.\n\nMAY GOD, WHO HAS ENLIGHTENED EVERY HEART, HELP YOU TO KNOW YOUR SINS AND TRUST IN HIS MERCY.\n\nTYPE AMEN. THEN PRESS RETURN',
                amen: true,
                keepWords: true
            },
            {
                name: 'long',
                text: 'BLESS ME FATHER FOR I HAVE SINNED, IT HAS BEEN (HOW LONG) SINCE MY LAST CONFESSION.\n\nREAD ALOUD/TYPE HOW LONG IT HAS BEEN. THEN PRESS RETURN'
            },
            {
                name: 'ready',
                text: 'ARE YOU PREPARED TO CONFESS YOUR SINS BEFORE GOD?\n\nTYPE YES. THEN PRESS RETURN',
                boolean: true
            },
            {
                name: "sin",
                text: "UNCHASTE KISS\nUNCHASTE TOUCH\nFORNICATION\nDEBAUCHERY\nADULTERY\nSACRILEGE\nABDUCTION OF A VIRGIN\nABDUCTION OF A WIFE\nINCEST\nABDUCTION OF A NUN\nMASTURBATION\nIMPROPER MANNER\nSODOMY\nBEASTIALITY\nEXCESSIVE MATERIALISM\nLYING\nLAZINESS\nJEALOUSY\nPREMARITAL SEX\nRECKLESS DRIVING\nSELFISHNESS\nHATRED\nCALUMNY\nBLASPHEMY\nGOSSIP\nPRIDE\nSUPERSTITION\nSTEALING\nSINS OF OMISSION\nWITCHCRAFT\nEVIL THOUGHTS\nSWEARING\nSLOTH\nIDOLATRY\nLUST\nGLUTTONY\nOTHER\n\nTYPE YOUR SIN. THEN PRESS RETURN",
                sin: true
            },
            {
                name: "inquiry1",
                inquiry: true
            },
            {
                name: "inquiry2",
                inquiry: true
            },
            {
                name: "inquiry3",
                inquiry: true
            },
            {
                name: "inquiry4",
                inquiry: true
            },
            {
                name: "inquiry5",
                inquiry: true
            },
            {
                name: "absolution",
                text: "ARE YOU SORRY FOR YOUR SINS AND PREPARED FOR GOD'S ABSOLUTION?\n\nTYPE YOUR ANSWER, YES OR NO. THEN PRESS RETURN",
                boolean: true,
            },
            {
                name: "penance",
                text: "MY CHILD, FOR YOUR PENANCE AND ABSOLUTION FROM YOUR SINS, YOU MUST PRAY.\n\n",
                penance: true,
                amen: true
            },
            {
                name: "aloud",
                text: "OH MY GOD, I AM HEARTILY SORRY FOR HAVING OFFENDED THEE, AND I DETEST MY SINS BECAUSE OF THY JUST PUNISHMENTS, BUT MOST OF ALL BECAUSE THEY OFFEND THEE, MY GOD, WHO ART ALL GOOD AND DESERVING OF ALL MY LOVE. I FIRMLY RESOLVE WITH THE HELP OF THY GRACE TO SIN NO MORE AND TO AVOID THE NEAR OCCASION OF SIN. AMEN.\n\nREAD ALOUD. THEN PRESS RETURN",
            },
            {
                name: "end",
                text: "GOD, THE FATHER OF MERCIES, THROUGH THE DEATH AND RESURRECTION OF HIS SON HAS RECONCILED THE WORLD TO HIMSELF AND SENT THE HOLY SPIRIT AMONG US FOR THE FORGIVENESS OF SINS: THROUGH THE MINISTRY OF THE CHURCH MAY GOD GIVE YOU PARDON AND PEACE, AND I ABSOLVE YOU FROM YOUR SINS IN THE NAME OF THE FATHER, AND OF THE SON, AND OF THE HOLY SPIRIT. GO FORTH AND SIN NO MORE! AMEN.\n\nTYPE AMEN. THEN PRESS RETURN",
                amen: true
            },
            {
                name: "endamen",
                endamen: true
            },


        ];
        function ask_questions(step) {
            var question = questions[step];
            term.clear();

            if (question) {
                if (question.inquiry) {
                    var randomIndex = Math.floor(Math.random() * inquiries.length);
                    var inquiry = inquiries.splice(randomIndex, 1)[0];
                    term.echo("\n" + inquiry + "\n", {
                        keepWords: true
                    });
                }
                if (question.penance) {
                    var randomPenance = penances[Math.floor(Math.random() * penances.length)];
                    if (randomPenance.includes("ONE HAIL MARY")) {
                        playAudio(11);
                    } else if (randomPenance.includes("TWO HAIL MARY")) {
                        playAudio(12);
                    } else if (randomPenance.includes("THREE HAIL MARY")) {
                        playAudio(13);
                    }
                    term.echo("\n" + question.text + randomPenance + "\n\nTYPE AMEN. THEN PRESS RETURN" + "\n", {
                        keepWords: true
                    });
                } else if (question.endamen) {
                    playAudio(15);
                    term.echo("[[;;;mercy]GODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCYGODISMERCYGODISMERCY\nGODISMERCYGODISMERCYGODISMERCY\nGODISMERCYGODISMERCYGODISMERCY\nGODISMERCYGODISMERCYGODISMERCY\nGODISMERCYGODISMERCYGODISMERCY\nGODISMERCYGODISMERCYGODISMERCY\nGODISMERCYGODISMERCYGODISMERCY\nGODISMERCYGODISMERCYGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY]\n\nGIVE THANKS TO THE LORD FOR HE IS GOOD.\n\nGO IN PEACE.\n\nTYPE AMEN. THEN PRESS RETURN", {
                        keepWords: false
                    });
                    setTimeout(() => {
                        playAudio(0);
                    }, 5000);

                    //setTimeout(() => { finish(); }, 7000);
                }
                else {
                    if (question.text) {
                        term.echo("\n" + question.text + "\n", {
                            keepWords: true
                        });
                    }

                    if (step == 0) {
                        playAudio(1);
                    } else if (step == 2) {
                        playAudio(2);
                    } else if (step == 3) {
                        playAudio(3);
                    } else if (step == 4 || step == 5 || step == 6 || step == 7 || step == 8) {
                        if (inquiry.includes("TELL")) {
                            playAudio(7);
                        } else if (inquiry.includes("CAN")) {
                            playAudio(4);
                        } else if (inquiry.includes("GUILTY")) {
                            playAudio(5);
                        } else if (inquiry.includes("REMORSE")) {
                            playAudio(6);
                        } else if (inquiry.includes("WHY")) {
                            playAudio(8);
                        }
                    } else if (step == 9) {
                        playAudio(9);
                    } else if (step == 12) {
                        playAudio(14);
                    }
                    else { playAudio(16) }
                }
                term.push(function (command) {
                    if (question.boolean) {
                        if (command.match(/^Y(es)?/i)) {
                            term.pop();
                            ask_questions(step + 1);
                        } else if (command.match(/([\s\S]*Not[\s\S]*?|^N(o)?)$/i)) {
                            term.echo("Type yes when you are ready\.");
                        }
                    } else if (question.amen) {
                        if (command.match(/amen/i)) {
                            term.pop();
                            ask_questions(step + 1);
                        }
                    } else if (question.endamen) {
                        if (command.match(/amen/i)) {
                            finish();
                        }
                    } else {
                        term.pop();
                        ask_questions(step + 1);
                    }
                }, { prompt: "]" });
            }
            else {
                finish();
            }
        }
        function finish() {
            term.reset();
        }
        term.history().disable();
        ask_questions(0);
    }, {
        greetings: '[[;;;mercy]GODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCYGODISMERCYGODISMERCY\nGODISMERCYGODISMERCYGODISMERCY\nGODISMERCYGODISMERCYGODISMERCY\nGODISMERCYGODISMERCYGODISMERCY\nGODISMERCYGODISMERCYGODISMERCY\nGODISMERCYGODISMERCYGODISMERCY\nGODISMERCYGODISMERCYGODISMERCY\nGODISMERCYGODISMERCYGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY]\n\n\nPress enter to begin',
        prompt: ']',
        memory: false,
        onBlur: function () {
            if (!isMobile)
                return false;
        }
    }
    );

});

document.addEventListener('DOMContentLoaded', e => {
    term.resize()
})