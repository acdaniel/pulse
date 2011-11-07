/**
 * The base class for actions.
 * @class base action
 */
PFPlay.Action = PFPlay.Node.extend(
/** @lends PFPlay.Action.prototype */
{
  /**
   * Initilization function
   * @param {object} params for this action must include target
   * @constructs
   */ 
  init: function(params) {
    this._super(params);
      
    if(params.target == "") {
      throw "Target must be included for action.";
    }
      
    /**
     * The target node for the action.
     * @type {PFPlay.Node} 
     */
    this.target = params.target;

    /**
     * Whether this action is currently running or not.
     * @type {boolean}
     */
    this.isRunning = false;

    /**
     * Whether this action is completed or not.
     * @type {boolean}
     */
    this.isComplete = false;

    /**
     * Event manager for action. Used to raise events such as complete.
     * @type {PFPlay.EventManager}
     */
    this.events = new PFPlay.EventManager();
  },

  /**
   * Starts the action.
   */
  start: function() {
    if(PFPlay.DEBUG) {
      console.log('action started');
    }
    if(this.target.runningActions) {
      this.target.runningActions.push(this);
    }
    this.isComplete = false;
    this.isRunning = true;
  },

  /**
   * Pauses the action.
   */
  pause: function() {
    if(PFPlay.DEBUG) {
      console.log('action paused');
    }
    this.isRunning = false;
  },

  /**
   * Stops the action.
   */
  stop: function() {
    if(PFPlay.DEBUG) {
      console.log('action stopped');
    }
    this.isRunning = false;
  },

  /**
   * Called when the action is complete.
   */
  complete: function() {
    if(PFPlay.DEBUG) {
      console.log('action complete');
    }
    this.isComplete = true;
    this.events.raiseEvent('complete', {action : this});
  }
});