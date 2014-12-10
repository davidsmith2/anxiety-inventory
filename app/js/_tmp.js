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
            getResponses: function () {
                return inventory.responses;
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

    .controller('MainCtrl', ['InventoriesService', function (InventoriesService) {
        var self = this;
        self.inventories = InventoriesService.collection;
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
            self.advanceWizard(categoryIndex);
            self.recordResponse();
        };
        self.advanceWizard = function (wizardNum) {
            self.subWizard = WizardHandler.wizard('subWizard' + wizardNum);
            self.subWizard.next();
        };
        self.recordResponse = function () {
            InventoryService.addResponse(self.inventory.response);
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
    }])