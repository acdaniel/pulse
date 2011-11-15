/**
 * @namespace debug
 */
pulse.debug = {};


/**
 * Debug manager handles logging and mark elapsed time for events
 * @class The debug manager class
 * @author PFP
 * @copyright 2011 Paranoid Ferret Productions
 */

pulse.debug.DebugManager = PClass.extend(
/** @lends pulse.debug.DebugManager.prototype */
{
  /** @constructs */
  init : function () {

    /**
     * Associative array (object) of timers.
     * @type {array}
     */
    this.timers = {};

    /**
     * Frames per second associated with this manager.
     * @type {number}
     */
    this.fps = 0;

    /** 
     * @private
     * Private properties of the node. Should not need or use these.
     * @type {object}
     */
    this._private = { };

    /**
     * @private
     * The fps calculator for this manager.
     * @type {pulse.debug.DebugFPS}
     */
    this._private.fpsCounter = new pulse.debug.DebugFPS();
  },

  logWarning : function() {
    
  },

  logDebug : function() {
    
  },

  logError : function() {
    
  },

  /**
   * Records a debugging event time. 
   * @param {string} timer the timer name to mark the event on
   */ 
  markTime : function(timer) {
    if(!this.timers[timer]) {
      this.timers[timer] = new pulse.debug.DebugTimer({name : timer});
      this.timers[timer].start();
    } else {
      this.timers[timer].mark();
    }
  },

  /**
   * Records a FPS update.
   */
  markFPS : function() {
    this._private.fpsCounter.mark();
    this.fps = this._private.fpsCounter.fps;
  }
  
});