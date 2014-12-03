angular
    .module('wizard', ['mgo-angular-wizard'])
    .factory('symptoms', [function () {
        var o = {
            collection: [
                {
                    description: 'Anxiety, nervousness, worry or fear',
                    category: 'Anxious Feelings'
                },
                {
                    description: 'Feeling that things around you are strange, unreal or foggy',
                    category: 'Anxious Feelings'
                },
                {
                    description: 'Feeling detached from all or part of your body',
                    category: 'Anxious Feelings'
                },
                {
                    description: 'Sudden unexpected panic spells',
                    category: 'Anxious Feelings'
                },
                {
                    description: 'Apprehension or a sense of impending doom',
                    category: 'Anxious Feelings'
                },
                {
                    description: 'Feeling tense, stressed, "uptight" or on edge',
                    category: 'Anxious Feelings'
                },
                {
                    description: 'Thinking you\'re on the verge of death',
                    category: 'Anxious Thoughts'
                },
                {
                    description: 'Thinking you\'re on the verge of death',
                    category: 'Anxious Thoughts'
                },
                {
                    description: 'Thinking you\'re on the verge of death',
                    category: 'Anxious Thoughts'
                },
                {
                    description: 'Thinking you\'re on the verge of death',
                    category: 'Anxious Thoughts'
                },
                {
                    description: 'Thinking you\'re on the verge of death',
                    category: 'Anxious Thoughts'
                },
                {
                    description: 'Thinking you\'re on the verge of death',
                    category: 'Anxious Thoughts'
                },
                {
                    description: 'Nausea, vomiting, diarrhea',
                    category: 'Physical Symptoms'
                },
                {
                    description: 'Nausea, vomiting, diarrhea',
                    category: 'Physical Symptoms'
                },
                {
                    description: 'Nausea, vomiting, diarrhea',
                    category: 'Physical Symptoms'
                },
                {
                    description: 'Nausea, vomiting, diarrhea',
                    category: 'Physical Symptoms'
                },
                {
                    description: 'Nausea, vomiting, diarrhea',
                    category: 'Physical Symptoms'
                },
                {
                    description: 'Nausea, vomiting, diarrhea',
                    category: 'Physical Symptoms'
                }
            ],
            getCategories: function () {
                var array = o.collection,
                    unique = {},
                    distinct = [];
                for (var i in array) {
                    if (typeof unique[array[i].category] == "undefined") {
                        distinct.push(array[i].category);
                    }
                    unique[array[i].category] = 0;
                }
                return distinct;
            },
            getSymptomsByCategory: function (category) {
                return _.where(o.collection, {category: category});
            }
        };
        return o;
    }])
    .controller('WizardMainCtrl', ['symptoms', function (symptoms) {
        var self = this;
        self.categories = symptoms.getCategories();
        self.isFinished = false;
        self.onFinish = function () {
            self.isFinished = true;
        };
    }])
    .controller('WizardSubCtrl', ['symptoms', 'WizardHandler', function (symptoms, WizardHandler) {
        var self = this;
        self.mainWizard = WizardHandler.wizard('mainWizard');
        self.getSymptoms = function (category) {
            return symptoms.getSymptomsByCategory(category);
        };
        self.onFinish = function (mainWizardIsFinished) {
            if (!mainWizardIsFinished) {
                self.mainWizard.next();
            } else {
                self.mainWizard.finish();
            }
        };
    }]);
