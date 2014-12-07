angular
    .module('wizard', ['mgo-angular-wizard'])
    .factory('symptoms', [function () {
        var responses = [
            {
                rating: 1,
                description: 'Low'
            },
            {
                rating: 2,
                description: 'Medium'
            },
            {
                rating: 3,
                description: 'High'
            }
        ];
        var o = {
            collection: [
                {
                    _id: '1',
                    description: 'Anxiety, nervousness, worry, or fear',
                    responses: responses,
                    category: 'Anxious Feelings'
                },
                {
                    _id: '2',
                    description: 'Feeling that things around you are strange, unreal, or foggy',
                    responses: responses,
                    category: 'Anxious Feelings'
                },
                {
                    _id: '3',
                    description: 'Feeling detached from all or part of your body',
                    responses: responses,
                    category: 'Anxious Feelings'
                },
                {
                    _id: '4',
                    description: 'Difficulty concentrating',
                    responses: responses,
                    category: 'Anxious Thoughts'
                },
                {
                    _id: '5',
                    description: 'Racing thoughts or having your mind jump from one thing to the next',
                    responses: responses,
                    category: 'Anxious Thoughts'
                },
                {
                    _id: '6',
                    description: 'Frightening fantasies or daydreams',
                    responses: responses,
                    category: 'Anxious Thoughts'
                },
                {
                    _id: '7',
                    description: 'Skipping or racing or pounding of the heart (sometimes called "palpitations")',
                    responses: responses,
                    category: 'Physical Symptoms'
                },
                {
                    _id: '8',
                    description: 'Pain, pressure, or tightness in the chest',
                    responses: responses,
                    category: 'Physical Symptoms'
                },
                {
                    _id: '9',
                    description: 'Tingling or numbness in the toes or fingers',
                    responses: responses,
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
    .factory('inventory', [function () {
        var o = {
            model: {
                date: new Date(),
                responses: []
            },
            addResponse: function (response) {
                o.model.responses.push(response);
            },
            getScore: function () {
                var score = 0,
                    responses = o.model.responses,
                    i;
                for (i = 0; i < responses.length; i++) {
                    score += parseInt(responses[i], 10);
                }
                return score;
            },
            getDegree: function (score) {
                var degree = '';
                if (score <= 4) {
                    degree = 'Minimal';
                } else if (score <= 10) {
                    degree = 'Borderline';
                } else if (score <= 20) {
                    degree = 'Mild';
                } else if (score <= 30) {
                    degree = 'Moderate';
                } else if (score <= 50) {
                    degree = 'Severe';
                } else {
                    degree = 'Extreme';
                }
                return degree;
            }
        };
        return o;
    }])
    .controller('WizardMainCtrl', ['symptoms', 'inventory', function (symptoms) {
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
        self.onFinish = function (isLastCategory) {
            if (!isLastCategory) {
                self.mainWizard.next();
            } else {
                self.mainWizard.finish();
            }
        };
    }])
    .controller('FormCtrl', ['WizardHandler', 'inventory', function (WizardHandler, inventory) {
        var self = this;
        self.submit = function (categoryIndex) {
            inventory.addResponse(self.inventory.response);
            self.subWizard = WizardHandler.wizard('subWizard' + categoryIndex);
            self.subWizard.next();
        };
    }])
    .controller('ScoreboardCtrl', ['inventory', function (inventory) {
        var self = this;
        self.getScore = function () {
            return inventory.getScore();
        };
        self.getDegree = function () {
            return inventory.getDegree(inventory.getScore());
        };
    }]);
