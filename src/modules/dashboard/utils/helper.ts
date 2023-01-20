export function getCustomUnit(unitType: string, offsetValue: number) {
  if (unitType == 'weight') {
    if (offsetValue) {
      if (offsetValue == 1000000) {
        return ' Ton';
      }
      if (offsetValue > 1000000) {
        return ' Tons';
      }
      if (offsetValue >= 1000) {
        return ' Kg';
      }
      return ' gm';
    }
  }
  if (unitType == 'distance') {
    if (offsetValue) {
      if (offsetValue > 1000) {
        return ' Km';
      }
      return ' m';
    }
  }
}

export function getCustomRoundOff(unitType: string, offsetValue = 0) {
  if (unitType == 'weight') {
    if (offsetValue) {
      if (offsetValue > 1000000) {
        return Math.round(offsetValue / 1000000).toFixed(2);
      }

      if (offsetValue > 1000) {
        return Math.round(offsetValue / 1000).toFixed(2);
      }
      return offsetValue.toFixed(2);
    }
  }
  if (unitType == 'distance') {
    if (offsetValue) {
      if (offsetValue > 1000) {
        return Math.round(offsetValue / 1000).toFixed(2);
      }
      return offsetValue.toFixed(2);
    }
  }
}
