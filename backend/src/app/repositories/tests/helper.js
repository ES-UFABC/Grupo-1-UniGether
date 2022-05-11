const filterIfKeyExist = (obejctOne, objectTwo) => {
    var result = new Object();
    Object.keys(obejctOne.dataValues).forEach(key => {
        if (objectTwo.hasOwnProperty(key)) {
            result[key] = obejctOne.dataValues[key];
        }    
    });
    return result;
};

module.exports = filterIfKeyExist;