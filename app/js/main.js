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
                    description: '1.1',
                    responses: responses,
                    response: 'test',
                    category: 'Anxious Feelings'
                },
                {
                    _id: '2',
                    description: '1.2',
                    responses: responses,
                    response: null,
                    category: 'Anxious Feelings'
                },
                {
                    _id: '3',
                    description: '1.3',
                    responses: responses,
                    response: null,
                    category: 'Anxious Feelings'
                },
                {
                    _id: '4',
                    description: '1.4',
                    responses: responses,
                    response: null,
                    category: 'Anxious Thoughts'
                },
                {
                    _id: '5',
                    description: '1.5',
                    responses: responses,
                    response: null,
                    category: 'Anxious Thoughts'
                },
                {
                    _id: '6',
                    description: '1.6',
                    responses: responses,
                    response: null,
                    category: 'Anxious Thoughts'
                },
                {
                    _id: '7',
                    description: '1.7',
                    responses: responses,
                    response: null,
                    category: 'Physical Symptoms'
                },
                {
                    _id: '8',
                    description: '1.8',
                    responses: responses,
                    response: null,
                    category: 'Physical Symptoms'
                },
                {
                    _id: '9',
                    description: '1.9',
                    responses: responses,
                    response: null,
                    category: 'Physical Symptoms'
                }
            ],
            get: function () {
                return o.collection;
            },
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
        self.numSymptoms = symptoms.get().length;
        self.categories = symptoms.getCategories();
        self.onFinish = function () {
            console.log('finished');
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
    .controller('FormCtrl', ['WizardHandler', function (WizardHandler) {
        var self = this;
        self.submit = function (categoryIndex) {
            self.subWizard = WizardHandler.wizard('subWizard' + categoryIndex);
            self.subWizard.next();
        };
    }]);
