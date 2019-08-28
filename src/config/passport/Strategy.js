import passport from 'passport';
import { facebookStrategy, googleStrategy } from './passport';
/**
 * @exports Strategy
 * @class Strategy
 * @description Handles all strategies
 * */
class Strategy {
  /**
     * Initialiaze all passport
     */
  constructor() {
    this.facebookStrategy = passport.use(facebookStrategy);
    this.googleStrategy = passport.use(googleStrategy);
    this.strategy = null;
  }

  /**
     * Check the environment
     * @function strategyTouse
     * @param  {string} strategy - accept social network to use
     * @return {string} Returns strategy
     */
  selectStrategy(strategy) {
    this.strategy = strategy;
    return this.strategy;
  }
}
export default Strategy;
