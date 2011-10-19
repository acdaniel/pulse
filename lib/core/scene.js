/**
 * @author Neo
 */

PFPlay.Scene = function(name)
{
  var _name = PFPlay.util.checkValue(name, 
    'scene' + (Math.random() * 10000));
  
  var _layers = {};
  
  this.active = false;
  
  this.name = function() { return _name; };
  
  this.addLayer = function(layer, zindex)
  {
    if(layer instanceof PFPlay.Layer)
    {
      if(typeof zindex == 'number')
        layer.zindex = zindex;
      
      _layers[layer.name()] = layer;
    }
  };
  
  this.removeLayer = function(name)
  {
    if(typeof name == 'string' && _layers.hasOwnProperty(name))
      delete _layers[name];
  };
  
  this.find = function(name)
  {
    var objects = new Array();
    
    for(var l in _layers)
    {
      
    }
  };
  
  this.getLayer = function(name)
  {
    if(_layers.hasOwnProperty(name))
      return _layers[name];
    else
      return null;
  };
  
  this.getLiveLayer = function(name)
  {
    if(_layers.hasOwnProperty(name))
      return document.getElementById(_layers[name] + 'Live');
  };
  
  this.getScene = function()
  {
    var sDiv = document.createElement('div');
    sDiv.id = _name;
    
    var oLayers = PFPlay.util.orderObjects(_layers);
    
    for(var l = 0; l < oLayers.length; l++)
    {
      var liveCanvas = oLayers[l].getCanvas().cloneNode(true);
      liveCanvas.id = oLayers[l].name() + 'Live';
      
      sDiv.appendChild(liveCanvas);
    }
    
    return sDiv;
  };
  
  this.update = function()
  {
    for(var l in _layers)
    {
      _layers[l].update();
      
      if(_layers[l].updated)
      {
        var live = document.getElementById(_layers[l].name() + 'Live');
        var cxt = live.getContext('2d');
        
        cxt.clearRect(0, 0, live.width, live.height);
        cxt.drawImage(_layers[l].getCanvas(), 0, 0);
      }
    }
  }
  
  this.raiseEvent = function(type, evt)
  {
    for(var l in _layers)
    {
      var lBounds = _layers[l].getBounds();
      
      if(evt.x > lBounds.x && evt.x < (lBounds.x + lBounds.width)
        && evt.y > lBounds.y && evt.y < (lBounds.y + lBounds.height))
      {
        _layers[l].raiseEvent(type, evt);
      }
    }
  };
};