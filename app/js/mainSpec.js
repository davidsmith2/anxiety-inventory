describe('Controller: MainCtrl', function () {

    var ctrl;

    beforeEach(module('BAI'));

    beforeEach(inject(function ($controller) {
        ctrl = $controller('MainCtrl');
    }));

    it('should have categories available on load', function () {
        expect(ctrl.categories).toEqual(['Anxious Feelings', 'Anxious Thoughts', 'Physical Symptoms']);
    });

});

describe('Controller: SubCtrl', function () {

    var ctrl;

    beforeEach(module('BAI'));

    beforeEach(inject(function ($controller) {
        ctrl = $controller('SubCtrl');
    }));

    it('should have symptoms available on load', function () {
        var symptoms = ctrl.getSymptoms('Anxious Feelings');
        expect(symptoms[0]).toEqual({
            _id: '1',
            description: 'Anxiety, nervousness, worry, or fear',
            responses: [
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
            ],
            category: 'Anxious Feelings'
        });
    });

});

describe('Controller: FormCtrl', function () {

    var ctrl, InventoryService;

    beforeEach(module('BAI'));

    beforeEach(inject(function ($controller, _InventoryService_) {
        ctrl = $controller('FormCtrl');
        ctrl.inventory = {
            response: '3'
        };
        InventoryService = _InventoryService_;
    }));

    it('should record responses and keep track of the score', function () {
        ctrl.recordResponse();
        expect(InventoryService.getResponses().length).toEqual(1);
        expect(InventoryService.getScore()).toEqual(3);
        expect(InventoryService.getDegree(InventoryService.getScore())).toEqual('Minimal');
        ctrl.recordResponse();
        expect(InventoryService.getResponses().length).toEqual(2);
        expect(InventoryService.getScore()).toEqual(6);
        expect(InventoryService.getDegree(InventoryService.getScore())).toEqual('Borderline');
    });

});
