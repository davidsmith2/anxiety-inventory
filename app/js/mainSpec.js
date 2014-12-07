describe('Controller: MainCtrl', function () {

    var ctrl;

    beforeEach(module('wizard'));

    beforeEach(inject(function ($controller) {
        ctrl = $controller('WizardMainCtrl');
    }));

    it('should have categories available on load', function () {
        expect(ctrl.categories).toEqual(['Anxious Feelings', 'Anxious Thoughts', 'Physical Symptoms']);
    });

});

describe('Controller: SubCtrl', function () {

    var ctrl;

    beforeEach(module('wizard'));

    beforeEach(inject(function ($controller) {
        ctrl = $controller('WizardSubCtrl');
    }));

    it('should have symptoms available on load', function () {
        var symptoms = ctrl.getSymptoms('Anxious Feelings');
        expect(symptoms[0]).toEqual({
            _id: '1',
            description: '1.1',
            responses: [
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
            ],
            response: null,
            category: 'Anxious Feelings'
        });
    });

});
