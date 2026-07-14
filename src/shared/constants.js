function createScanResult(id, category, maxScore = 20) {

    return {

        id,
        category,
        score: maxScore,
        maxScore,
        observations: [],
        risks: [],
        recommendations: [],
        details: {}

    };

}