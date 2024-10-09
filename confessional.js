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
            "2 OUR FATHER’S 1 HAIL MARY", "3 OUR FATHER’S 1 HAIL MARY", "1 OUR FATHER 3 HAIL MARY’S", "1 HAIL MARY 1 OUR FATHER", "2 HAIL MARY’S 1 OUR FATHER", "3 HAIL MARY’S 2 OUR FATHER’S", "3 HAIL MARY’S 3 OUR FATHER’S"
        ]
        var questions = [
            {
                name: "start",
                text: '\nPRIEST: IN THE NAME OF THE FATHER, AND OF THE SON, AND OF THE HOLY SPIRIT.\nAMEN.\n\nMAY GOD, WHO HAS ENLIGHTENED EVERY HEART, HELP YOU TO KNOW YOUR SINS AND TRUST IN HIS MERCY.\n\nTYPE AMEN. THEN PRESS RETURN',
                amen: true
            },
            {
                name: 'long',
                text: 'BLESS ME FATHER FOR I HAVE SINNED, IT HAS BEEN (HOW LONG) SINCE MY LAST CONFESSION, AND THESE ARE MY SINS.\n\nTYPE HOW LONG IT HAS BEEN. THEN PRESS RETURN'
            },
            {
                name: "sin",
                text: "UNCHASTE KISS\nUNCHASTE TOUCH\nFORNICATION\nDEBAUCHERY\nADULTERY\nSACRILEGE\nABDUCTION OF A VIRGIN\nABDUCTION OF A WIFE\nINCEST\nABDUCTION OF A NUN\nMASTURBATION\nIMPROPER MANNER\nSODOMY\nBEASTIALITY\nOTHER\n\nTYPE YOUR SIN. THEN PRESS RETURN",
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
                name: "penance",
                text: "MY CHILD, FOR YOUR PENANCE AND ABSOLUTION FROM YOUR SINS, YOU MUST PRAY.\n\nYOUR PENANCE IS\n",
                penance: true
            },
            {
                name: "aloud",
                text: "OH MY GOD, I AM HEARTILY SORRY FOR HAVING OFFENDED THEE, AND I DETEST MY SINS BECAUSE OF THY JUST PUNISHMENTS, BUT MOST OF ALL BECAUSE THEY OFFEND THEE, MY GOD, WHO ART ALL GOOD AND DERVING OF ALL MY LOVE. I FIRMLY RESOLVE WITH THE HELP OF THY GRACE TO SIN NO MORE AND TO AVOIDE THE NEAR OCCASION OF SIN. AMEN.\n\nREAD ALOUD. THEN PRESS RETURN",
            },
            {
                name: "end",
                text: "Priest says:\nGOD, THE FATHER OF MERCIES, THROUGH THE DEATH AND RESURRECTION OF HIS SON HAS RECONCILED THE WORLD TO HIMSELF AND SENT THE HOLY SPIRIT AMONG US FOR THE FORGIVENESS OF SINS: THROUGH THE MINISTRY OF THE CHUCH MAY GOD GIVE YOU PARDON AND PEACE, AND I ABSOLVE YOU FROM YOUR SINS IN THE NAME OF THE FATHER, AND OF THE SON, AND OF THE HOLY SPIRITY. GO FORTH AND SIN NO MORE! AMEN.\n\nTYPE AMEN. THEN PRESS RETURN",
                endamen: true,
            },


        ];
        function ask_questions(step) {
            var question = questions[step];

            if (question) {
                if (question.inquiry) {
                    var inquiry = inquiries[Math.floor(Math.random() * inquiries.length)];
                    term.echo("\n" + inquiry + "\n");
                }
                if (question.penance) {
                    var randomPenance = penances[Math.floor(Math.random() * penances.length)];
                    term.echo("\n" + question.text + randomPenance + "\n");
                } else {
                    if (question.text) {
                        term.echo("\n" + question.text + "\n");

                    }
                }
                term.push(function (command) {
                    if (question.boolean) {
                        var value;
                        if (command.match(/^Y(es)?/i)) {
                            value = true;
                        } else if (command.match(/^N(o)?/i)) {
                            value = false;
                        }
                        if (typeof value != 'undefined') {
                            term.pop();
                            ask_questions(step + 1);
                        }
                    } else if (question.amen) {
                        if (command.match(/amen/i)) {
                            term.pop();
                            ask_questions(step + 1);
                        }
                    } else if (question.endamen) {
                        if (command.match(/amen/i)) {

                            term.echo("[[;;;mercy]GODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCYGODISMERCYGODISMERCY\nGODISMERCYGODISMERCYGODISMERCY\nGODISMERCYGODISMERCYGODISMERCY\nGODISMERCYGODISMERCYGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY\nGODISMERCY]");
                            setTimeout(() => { finish(); }, 5000);
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
        greetings: 'Press enter to begin',
        prompt: ']',
    }
    );

});