angular
    .module('BAI', ['mgo-angular-wizard'])
    .factory('ResponsesService', [function () {
        var responses, API;
        responses = [
            {
                rating: 0,
                description: 'Not at all'
            },
            {
                rating: 1,
                description: 'Somewhat'
            },
            {
                rating: 2,
                description: 'Moderately'
            },
            {
                rating: 3,
                description: 'A lot'
            }
        ];
        API = {
            list: function () {
                return responses;
            }
        };
        return API;
    }])
    .factory('SymptomsService', ['ResponsesService', function (ResponsesService) {
        var symptoms, API;
        symptoms = [
            {
                _id: '1',
                description: 'Anxiety, nervousness, worry, or fear',
                responses: ResponsesService.list(),
                category: 'Anxious Feelings'
            },
            {
                _id: '2',
                description: 'Feeling that things around you are strange, unreal, or foggy',
                responses: ResponsesService.list(),
                category: 'Anxious Feelings'
            },
            {
                _id: '3',
                description: 'Feeling detached from all or part of your body',
                responses: ResponsesService.list(),
                category: 'Anxious Feelings'
            },
            {
                _id: '4',
                description: 'Difficulty concentrating',
                responses: ResponsesService.list(),
                category: 'Anxious Thoughts'
            },
            {
                _id: '5',
                description: 'Racing thoughts or having your mind jump from one thing to the next',
                responses: ResponsesService.list(),
                category: 'Anxious Thoughts'
            },
            {
                _id: '6',
                description: 'Frightening fantasies or daydreams',
                responses: ResponsesService.list(),
                category: 'Anxious Thoughts'
            },
            {
                _id: '7',
                description: 'Skipping or racing or pounding of the heart (sometimes called "palpitations")',
                responses: ResponsesService.list(),
                category: 'Physical Symptoms'
            },
            {
                _id: '8',
                description: 'Pain, pressure, or tightness in the chest',
                responses: ResponsesService.list(),
                category: 'Physical Symptoms'
            },
            {
                _id: '9',
                description: 'Tingling or numbness in the toes or fingers',
                responses: ResponsesService.list(),
                category: 'Physical Symptoms'
            }
        ];
        API = {
            list: function () {
                return symptoms;
            },
            listByCategory: function (category) {
                return _.where(symptoms, {category: category});
            },
            listCategories: function () {
                var array = symptoms,
                    unique = {},
                    distinct = [];
                for (var i in array) {
                    if (typeof unique[array[i].category] == "undefined") {
                        distinct.push(array[i].category);
                    }
                    unique[array[i].category] = 0;
                }
                return distinct;
            }
        };
        return API;
    }])
    .factory('InventoryService', [function () {
        var inventory, API;
        inventory = {
            date: new Date(),
            responses: []
        };
        API = {
            addResponse: function (response) {
                inventory.responses.push(response);
            },
            getScore: function () {
                var score = 0,
                    responses = inventory.responses,
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
        return API;
    }])
    .controller('MainCtrl', ['SymptomsService', function (SymptomsService) {
        var self = this;
        self.categories = SymptomsService.listCategories();
        self.isFinished = false;
        self.onFinish = function () {
            self.isFinished = true;
        };
    }])
    .controller('SubCtrl', ['SymptomsService', 'WizardHandler', function (SymptomsService, WizardHandler) {
        var self = this;
        self.mainWizard = WizardHandler.wizard('mainWizard');
        self.getSymptoms = function (category) {
            return SymptomsService.listByCategory(category);
        };
        self.onFinish = function (isLastCategory) {
            if (!isLastCategory) {
                self.mainWizard.next();
            } else {
                self.mainWizard.finish();
            }
        };
    }])
    .controller('FormCtrl', ['InventoryService', 'WizardHandler', function (InventoryService, WizardHandler) {
        var self = this;
        self.submit = function (categoryIndex) {
            InventoryService.addResponse(self.inventory.response);
            self.subWizard = WizardHandler.wizard('subWizard' + categoryIndex);
            self.subWizard.next();
        };
    }])
    .controller('ScoreboardCtrl', ['InventoryService', function (InventoryService) {
        var self = this;
        self.getScore = function () {
            return InventoryService.getScore();
        };
        self.getDegree = function () {
            return InventoryService.getDegree(InventoryService.getScore());
        };
    }]);
