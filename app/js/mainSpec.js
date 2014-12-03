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
        expect(ctrl.getSymptoms('Anxious Feelings')).toEqual([{
            description: 'Anxiety, nervousness, worry or fear',
            category: 'Anxious Feelings'
        }]);
    });

});
