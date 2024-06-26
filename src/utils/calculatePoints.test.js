

describe('calculatePoints', () => {
    const { calculatePoints } = jest.requireActual('./calculatePoints');
  
    it('should calculate points correctly for amounts over $100', () => {
      expect(calculatePoints(120)).toBe(90); // 2*(120-100) + 1*(100-50)
    });
  
    it('should calculate points correctly for amounts between $50 and $100', () => {
      expect(calculatePoints(75)).toBe(25); // 1*(75-50)
    });
  
    it('should calculate points correctly for amounts exactly $100', () => {
      expect(calculatePoints(100)).toBe(50); // 1*(100-50)
    });
  
    it('should calculate points correctly for amounts exactly $50', () => {
      expect(calculatePoints(50)).toBe(0); // No points
    });
  
    it('should calculate points correctly for amounts below $50', () => {
      expect(calculatePoints(30)).toBe(0); // No points
    });
  });