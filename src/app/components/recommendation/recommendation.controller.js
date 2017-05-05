class RecommendationController {
}

export const Recommendation = {
  template: require('./recommendation.html'),
  controller: RecommendationController,
  bindings: {
    date: '=',
    message: '=',
  },
};
