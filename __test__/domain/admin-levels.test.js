const {AdminLevel, AdminLevelAggregator, LevelTypes, lowerLevelOf} = require('../../src/domain/admin-levels');

describe('Political divisions', () => {

  const PROVINCE_ID = '15';
  const PROVINCE_NAME = 'A Coruña';
  const PROVINCE_TYPE = LevelTypes.Provincia;
  const LEVELS = [{
    id: PROVINCE_ID,
    name: PROVINCE_NAME,
    subLevels: [{
      id: '20',
      name: 'Santiago',
      subLevels: []
    }]
  }];

  describe('Aggregator', () => {
    test('Should add level', () => {
      const divisions = new AdminLevelAggregator();
      const province = new AdminLevel(PROVINCE_ID, PROVINCE_NAME);

      divisions.addSubLevel(province);

      expect(divisions.hasSubLevel(province))
        .toBe(true);
    });

    test('Should detect not existent level', () => {
      const divisions = new AdminLevelAggregator();
      const province = new AdminLevel(PROVINCE_ID, PROVINCE_NAME);

      expect(divisions.hasSubLevel(province))
        .toBe(false);
    });

    test('Should return array of levels', () => {
      const divisions = new AdminLevelAggregator();
      const province = new AdminLevel(PROVINCE_ID, PROVINCE_NAME);
      divisions.addSubLevel(province);

      expect(divisions.toJSON())
        .toEqual([{
          id: PROVINCE_ID,
          name: PROVINCE_NAME,
          subLevels: []
        }]);
    });

    test('Should return an empty array of levels', () => {
      const divisions = new AdminLevelAggregator();

      expect(divisions.toJSON())
        .toEqual([]);
    });

    test('Should find a sublevel by id', () => {
      const divisions = new AdminLevelAggregator();
      const province = new AdminLevel(PROVINCE_ID, PROVINCE_NAME);

      divisions.addSubLevel(province);

      expect(divisions.findSubLevelById(province.id))
        .toBe(province);
    });
  });

  describe('Administrative Level', () => {

    test('Should set properties on creation', () => {
      const province = new AdminLevel(PROVINCE_ID, PROVINCE_NAME, PROVINCE_TYPE);

      expect(province.id)
        .toBe(PROVINCE_ID);
      expect(province.name)
        .toBe(PROVINCE_NAME);
      expect(province.type)
        .toBe(PROVINCE_TYPE);
    });

    test('Should create from raw data', () => {
      const level = AdminLevel.from(LEVELS);
      expect(level)
        .toBeInstanceOf(AdminLevel);
    });
  });

  describe('Legal types', () => {
    test.each([
      [LevelTypes.Provincia, LevelTypes.Comarca],
      [LevelTypes.Concello, LevelTypes.Parroquia],
      [LevelTypes.Poboacion, null],
    ])('Lower level type of %s: %s', (current, next) => {
      expect(lowerLevelOf(current))
        .toBe(next);
    })
  })
});
