this.wozllajs = this.wozllajs || {};

(function() {

	"use strict";

    var testHitCanvas = document.createElement('canvas');
    var testHitContext = testHitCanvas.getContext('2d');
    testHitCanvas.width = 1;
    testHitCanvas.height = 1;

	var GameObject = function(id) {
		this.initialize(id);
	};

    var p = GameObject.prototype = Object.create(wozllajs.EventTarget.prototype);

	wozllajs.extend(p, {

        UID : null,

		id : null,

        isGameObject : true,

		transform : null,

		_renderer : null,

		_collider : null,

        _layout : null,

		_behaviours : null,

        _filters : null,

        _aliasMap : null,

		_parent : null,

		_componentInited : false,

		_active : true,

		_visible : true,

        _layer : null,

        _mouseEnable : true,

        _hitTestDelegate : null,

		_children : null,

		_childrenMap : null,

        _delayRemoves : null,

		_resources : null,

        _cacheCanvas : null,

        _cacheContext : null,

        _cached : false,

        _cacheOffsetX : 0,

        _cacheOffsetY : 0,

        g : function() {
            return this.getObjectById.apply(this, arguments);
        },

        f : function() {
            return this.findObjectById.apply(this, arguments);
        },

        fp : function() {
            return this.findObjectByPath.apply(this, arguments);
        },

        bset : function() {
            this.batchSetProperties.apply(this, arguments);
        },

        bcset : function() {
            this.batchSetChildrenProperties.apply(this, arguments);
        },

		initialize : function(id) {
            wozllajs.EventTarget.call(this);
            this.UID = wozllajs.UniqueKeyGen ++;
			this.id = id;
			this.transform = new wozllajs.Transform();
			this._behaviours = {};
            this._filters = {};
            this._aliasMap = {};
			this._children = [];
			this._childrenMap = {};
			this._resources = [];
            this._delayRemoves = [];
		},

        setId : function(id) {
            if(this._parent) {
                delete this._parent._childrenMap[this.id];
                this._parent._childrenMap[id] = this;
            }
            this.id = id;
        },

		getParent : function() {
			return this._parent;
		},

        getPath : function(seperator) {
            var o = this;
            var path = [];
            var deep = 0;
            while(o) {
                path.unshift(o.id);
                o = o._parent;
            }
            return path.join(seperator || '.');
        },

        getStage : function() {
            var o = this;
            while(o && !o.isStage) {
                o = o._parent;
            }
            return o;
        },

		getObjectById : function(id) {
        	return this._childrenMap[id];
    	},

	    addObject : function(obj) {
	        this._childrenMap[obj.id] = obj;
	        this._children.push(obj);
	        obj._parent = this;
            obj.transform.parent = this.transform;
	    },

        insertObject : function(obj, index) {
            this._childrenMap[obj.id] = obj;
            this._children.splice(index, 0, obj);
            obj._parent = this;
            obj.transform.parent = this.transform;
        },

        insertBefore : function(obj, objOrId) {
            var i, len, child;
            var index = 0;
            for(i=0,len=this._children.length; i<len; i++) {
                child = this._children[i];
                if(child === objOrId || child.id === objOrId) {
                    index = i;
                    break;
                }
            }
            this.insertObject(obj, index);
        },

        insertAfter : function(obj, objOrId) {
            var i, len, child;
            var index = this._children.length;
            for(i=0,len=this._children.length; i<len; i++) {
                child = this._children[i];
                if(child === objOrId || child.id === objOrId) {
                    index = i;
                    break;
                }
            }
            this.insertObject(obj, index+1);
        },

        delayRemove : function() {
            this._parent.delayRemoveObject(this);
            this._parent = null;
        },

        delayRemoveObject : function(idOrObj) {
            var obj = typeof idOrObj === 'string' ? this._childrenMap[idOrObj] : idOrObj;
            this._delayRemoves.push(obj);
        },

	    removeObject : function(idOrObj) {
	        var children = this._children;
	        var obj = typeof idOrObj === 'string' ? this._childrenMap[idOrObj] : idOrObj;
	        var idx = wozllajs.arrayRemove(obj, children);
	        if(idx !== -1) {
	            delete this._childrenMap[obj.id];
                obj._parent = null;
                obj.transform.parent = null;
	        }
	        return idx;
	    },

	    remove : function() {
	        this._parent && this._parent.removeObject(this);
	        this._parent = null;
	    },

	    findObjectById : function(id) {
	    	var i, len, children;
	        var obj = this.getObjectById(id);
	        if(!obj) {
	            children = this._children;
	            for(i=0,len=children.length; i<len; i++) {
	                obj = children[i].findObjectById(id);
	                if(obj) break;
	            }
	        }
	        return obj;
	    },

        findObjectByPath : function(path) {
            var i, len;
            var paths = path.split('.');
            var obj = this.findObjectById(paths[0]);
            if(obj) {
                for(i=1, len=paths.length; i<len; i++) {
                    obj = obj.getObjectById(paths[i]);
                    if(!obj) return null;
                }
            }
            return obj;
        },

        getChildren : function() {
            return this._children;
        },

        batchSetChildrenProperties : function(objectProperties) {
            var children = this._children;
            var i, len;
            for(i=0,len=children.length; i<len; i++) {
                children[i].batchSetProperties(objectProperties);
            }
        },

        batchSetProperties : function(path, objectProperties, multiObject) {
            var target, obj;
            var property;
            if(typeof path !== 'string') {
                multiObject = objectProperties;
                objectProperties = path;
                if(multiObject) {
                    for(obj in objectProperties) {
                        target.findObjectByPath(obj).batchSetProperties(objectProperties[obj]);
                    }
                } else {
                    for(property in objectProperties) {
                        switch(property) {
                            case 'active' :
                                this.setActive(objectProperties[property]); break;
                            case 'visible' :
                                this.setVisible(objectProperties[property]); break;
                            case 'x' :
                            case 'y' :
                            case 'regX' :
                            case 'regY' :
                            case 'scaleX' :
                            case 'scaleY' :
                            case 'alpha' :
                            case 'rotation' :
                                this.transform[property] = objectProperties[property]; break;
                        }
                    }
                }
            }
            else if(path) {
                target = this.findObjectByPath(path);
                if(multiObject) {
                    for(obj in objectProperties) {
                        target.findObjectByPath(obj).batchSetProperties(objectProperties[obj]);
                    }
                } else {
                    target.batchSetProperties(objectProperties);
                }
            }
        },

        removeAll : function(destroy) {
            var i, len;
            if(destroy) {
                for(i=0,len=this._children.length; i<len; i++) {
                    this._children[i].destroy();
                }
            }
            this._children = [];
            this._childrenMap = {};
        },

        sortChildren : function(func) {
            this._children.sort(func);
        },

	    isActive : function(parent) {
            if(!parent) {
	    	    return this._active;
            } else {
                var active = true;
                var o = this;
                while(o) {
                    active = active && o._active;
                    if(!active) {
                        return false;
                    }
                    o = o._parent;
                }
                return active;
            }
	    },

	    setActive : function(active) {
	        this._active = !!active;
	    },

	    isVisible : function(parent) {
            if(!parent) {
                return this._visible;
            } else {
                var visible = true;
                var o = this;
                while(o) {
                    visible = visible && o._visible;
                    if(!visible) {
                        return false;
                    }
                    o = o._parent;
                }
                return visible;
            }
	    },

	    setVisible : function(visible) {
	        this._visible = !!visible;
	    },

        getLayer : function(fromParent) {
            if(!fromParent) {
                return this._layer;
            }
            var o = this;
            while(o && !o._layer) {
                o = o._parent;
            }
            return o && o._layer;
        },

        getEventLayer : function() {
            var layer;
            var layerZ;
            var layers;
            var i, len;
            var o = this;
            var getLayerZ = wozllajs.LayerManager.getLayerZ;
            while(o) {
                if(o._layer) {
                    layers = o._layer.split(',');
                    for(i=0,len=layers.length; i<len; i++) {
                        layer = layers[i];
                        layerZ = getLayerZ(layer);
                        if(parseInt(layerZ) === layerZ) {
                            return layer;
                        }
                    }
                }
                o = o._parent;
            }
            return -9999999;
        },

        setLayer : function(layer) {
            this._layer = layer;
        },

        isInLayer : function(layer) {
            return this._layer && this._layer.indexOf(layer) !== -1;
        },

        isMouseEnable : function() {
            return this._mouseEnable;
        },

        setMouseEnable : function(enable) {
            this._mouseEnable = enable;
        },

        testHit : function(x, y, onlyRenderSelf) {
            var hit = false;
            if(!this.isActive(true) || !this.isVisible(true)) {
                return hit;
            }
            if(this._hitTestDelegate) {
                hit = this._hitTestDelegate.testHit(x, y);
            }
            else if(this._cacheCanvas && this._cached) {
                hit = this._cacheContext.getImageData(-this._cacheOffsetX+x, -this._cacheOffsetY+y, 1, 1).data[3] > 1;
            }
            else {
                testHitContext.setTransform(1, 0, 0, 1, -x, -y);
                if(onlyRenderSelf) {
                    this._renderer && this._renderer.draw(testHitContext, this.getStage().getVisibleRect());
                } else {
                    this._draw(testHitContext, this.getStage().getVisibleRect());
                }
                hit = testHitContext.getImageData(0, 0, 1, 1).data[3] > 1;
                testHitContext.setTransform(1, 0, 0, 1, 0, 0);
                testHitContext.clearRect(0, 0, 2, 2);
            }
            return hit;
        },

        getTopObjectUnderPoint : function(x, y) {
            var i, child, obj, localPoint;
            for(i=this._children.length-1; i>=0 ; i--) {
                child = this._children[i];
                obj = child.getTopObjectUnderPoint(x, y);
                if(obj) {
                    return obj;
                }
            }
            localPoint = this.transform.globalToLocal(x, y);
            if(this.testHit(localPoint.x, localPoint.y, true)) {
                return this;
            }
            return null;
        },

	    loadResources : function(params) {
			this._collectResources(this._resources);
	        wozllajs.ResourceManager.load({
	            items : this._resources,
	            onProgress : params.onProgress,
	            onComplete : params.onComplete
	        });
		},

		releaseResources : function(whiteList) {
	        var i, len, resource, r, id;
			var res = this._resources;
	        for(i=0, len=res.length; i<len; i++) {
                r = res[i];
                id = typeof r === 'string' ? r : r.id;
                resource = wozllajs.ResourceManager.getResource(id);
                if(!whiteList || wozllajs.indexOf(id, whiteList) === -1) {
                    wozllajs.ResourceManager.removeResource(id, resource);
                }
	        }
            this.uncache();
		},

        callBehaviour : function(funcName, args) {
            var i, len;
            var behaviourId, behaviour, func;
            var children = this._children;
            for(behaviourId in this._behaviours) {
                behaviour = this._behaviours[behaviourId];
                behaviour && behaviour[funcName] && behaviour[funcName].apply(behaviour, args);
            }

            for(i=0,len=children.length; i<len; i++) {
                children[i].callBehaviour(funcName, args);
            }
        },

	    init : function() {
	    	var i, len, layers;
			var behaviourId, behaviour;
			var children = this._children;

            this._layout && this._layout.initComponent();
	    	this._renderer && this._renderer.initComponent();
	    	this._collider && this._collider.initComponent();
	    	for(behaviourId in this._behaviours) {
	    		behaviour = this._behaviours[behaviourId];
	    		behaviour && behaviour.initComponent();
	    	}

	    	for(i=0,len=children.length; i<len; i++) {
	    		children[i].init();
	    	}
            if(this._layer) {
                layers = this._layer.split(',');
                for(i=0,len=layers.length; i<len; i++) {
                    if(layers[i]) {
                        wozllajs.LayerManager.appendTo(layers[i], this);
                    }
                }
            }
	    	this._componentInited = true;

            this._layout && this._layout.onStageInit();
            this._renderer && this._renderer.onStageInit();
            this._collider && this._collider.onStageInit();
            for(behaviourId in this._behaviours) {
                behaviour = this._behaviours[behaviourId];
                behaviour && behaviour.onStageInit();
            }

            this._doDelayRemove();
		},

		destroy : function() {
			var i, len;
			var behaviourId, behaviour;
			var children = this._children;

			for(behaviourId in this._behaviours) {
	    		behaviour = this._behaviours[behaviourId];
	    		behaviour && behaviour.destroyComponent();
	    	}
	    	this._collider && this._collider.destroyComponent();
	    	this._renderer && this._renderer.destroyComponent();
            this._layout && this._layout.destroyComponent();
	    	for(i=0,len=children.length; i<len; i++) {
	    		children[i].destroy();
	    	}
            wozllajs.LayerManager.removeFrom(this._layer, this);

            this.uncache();
		},

        layout : function() {
            var i, len;
            var children = this._children;
            this._layout && this._layout.doLayout();
            for(i=0,len=children.length; i<len; i++) {
                children[i].layout();
            }
        },

		update : function() {
			var i, len;
			var behaviourId, behaviour;
			var children = this._children;

            this._doDelayRemove();

			if(!this._componentInited || !this._active) {
				return;
			}

			for(behaviourId in this._behaviours) {
	    		behaviour = this._behaviours[behaviourId];
	    		behaviour && behaviour.update && behaviour.update();
	    	}
	    	this._renderer && this._renderer.update && this._renderer.update();
	    	for(i=0,len=children.length; i<len; i++) {
	    		children[i].update();
	    	}
		},

		lateUpdate : function() {
			var i, len;
			var behaviourId, behaviour;
			var children = this._children;

            this._doDelayRemove();

			if(!this._componentInited || !this._active) {
				return;
			}

			for(behaviourId in this._behaviours) {
	    		behaviour = this._behaviours[behaviourId];
	    		behaviour && behaviour.lateUpdate && behaviour.lateUpdate();
	    	}
	    	this._renderer && this._renderer.lateUpdate && this._renderer.lateUpdate();
	    	for(i=0,len=children.length; i<len; i++) {
	    		children[i].lateUpdate();
	    	}
		},

		draw : function(context, visibleRect) {
            var cacheContext;
			if(!this._componentInited || !this._active || !this._visible) {
				return;
			}

			context.save();
        	this.transform.updateContext(context);
            if(this._cacheCanvas) {
                if(!this._cached) {
                    this._drawCache();
                    this._cached = true;
                }
                context.drawImage(this._cacheCanvas, 0, 0);
            } else {
			    this._draw(context, visibleRect);
            }

			context.restore();
		},

        cache : function(x, y, width, height) {
            if(this._cacheCanvas) {
                this.uncache();
            }
            this._cacheOffsetX = x;
            this._cacheOffsetY = y;
            this._cacheCanvas = wozllajs.createCanvas(width, height);
            this._cacheContext = this._cacheCanvas.getContext('2d');
            this._cached = false;
        },

        updateCache : function(offsetX, offsetY) {
            this._cached = false;
            this._cacheOffsetX = offsetX || this._cacheOffsetX;
            this._cacheOffsetY = offsetY || this._cacheOffsetY;
        },

        translateCache : function(deltaX, deltaY) {
            this._cached = false;
            this._cacheOffsetX += deltaX;
            this._cacheOffsetY += deltaY;
        },

        uncache : function() {
            if(this._cacheCanvas) {
                this._cacheCanvas.dispose && this._cacheCanvas.dispose();
                this._cacheContext.dispose && this._cacheContext.dispose();
                this._cacheCanvas = null;
            }
            this._cached = false;
        },

		setRenderer : function(renderer) {
			this._renderer = renderer;
			renderer.setGameObject(this);
		},

		getRenderer : function() {
			return this._renderer;
		},

		setCollider : function(collider) {
			this._collider = collider;
            this._collider.setGameObject(this);
		},

		getCollider : function() {
			return this._collider;
		},

        setLayout : function(layout) {
            this._layout = layout;
            this._layout.setGameObject(this);
        },

        getLayout : function() {
            return this._layout;
        },

        setHitTestDelegate : function(delegate) {
            this._hitTestDelegate = delegate;
            this._hitTestDelegate.setGameObject(this);
        },

        getHitTestDelegate : function() {
            return this._hitTestDelegate;
        },

		addBehaviour : function(behaviour) {
			this._behaviours[behaviour.id] = behaviour;
            this._aliasMap[behaviour.alias] = behaviour;
			behaviour.setGameObject(this);
		},

		removeBehaviour : function(behaviour) {
            if(typeof behaviour === 'string') {
                behaviour = this.getBehaviour(behaviour);
                if(!behaviour) {
                    return;
                }
            }
			delete this._behaviours[behaviour.id];
            delete this._aliasMap[behaviour.alias]
			behaviour.setGameObject(null);
		},

		getBehaviour : function(id) {
			return this._behaviours[id] || this._aliasMap[id];
		},

        addFilter : function(filter) {
            this._filters[filter.id] = filter;
            filter.setGameObject(this);
        },

        removeFilter : function(filter) {
            if(typeof filter === 'string') {
                filter = this.getFilter(filter);
                if(!filter) {
                    return;
                }
            }
            delete this._filters[filter.id];
            filter.setGameObject(null);
        },

        getFilter : function(id) {
            return this._filters[id];
        },

        on : function(type, listener, scope) {
            var proxy = listener[this._getSimpleProxyKey(scope, type)] = wozllajs.proxy(listener, scope);
            wozllajs.EventAdmin.on(type, this, proxy, scope);
        },

        once : function(type, listener, scope) {
            var proxy = listener[this._getSimpleProxyKey(scope, type)] = wozllajs.proxy(listener, scope);
            wozllajs.EventAdmin.once(type, this, proxy, scope);
        },

        off : function(type, listener, scope) {
            wozllajs.EventAdmin.off(type, this, listener[this._getSimpleProxyKey(scope, type)]);
        },

        notify : function(type, params) {
            wozllajs.EventAdmin.notify(type, params);
        },

        _getSimpleProxyKey : function(scope, type) {
            return '_sp_' + scope.UID + '.' + type;
        },

		_draw : function(context, visibleRect) {
			var i, len;
			var children = this._children;

			this._renderer && this._renderer.draw(context, visibleRect);
			for(i=0,len=children.length; i<len; i++) {
	    		children[i].draw(context, visibleRect);
	    	}
		},

        _drawCache : function(context, visibleRect) {
            var cacheContext = this._cacheContext;
            cacheContext.clearRect(0, 0, this._cacheCanvas.width, this._cacheCanvas.height);
            cacheContext = this._cacheContext;
            cacheContext.translate(-this._cacheOffsetX, -this._cacheOffsetY);
            this._draw(cacheContext, visibleRect);
            cacheContext.translate(this._cacheOffsetX, this._cacheOffsetY);
            this._applyFilters(cacheContext, 0, 0, this._cacheCanvas.width, this._cacheCanvas.height);
        },

        _applyFilters : function(cacheContext, x, y, width, height) {
            for(var id in this._filters) {
                cacheContext.save();
                this._filters[id].applyFilter(cacheContext, x, y, width, height);
                cacheContext.restore();
            }
        },

		_collectResources : function(collection) {
			var behaviourId, behaviour;
            var i, len;
            var children = this._children;
			for(behaviourId in this._behaviours) {
	    		behaviour = this._behaviours[behaviourId];
	    		behaviour && behaviour._collectResources(collection);
	    	}
	    	this._renderer && this._renderer._collectResources(collection);
            for(i=0,len=children.length; i<len; i++) {
                children[i]._collectResources(collection);
            }
            this._doDelayRemove();
		},

        _doDelayRemove : function() {
            var i, len;
            for(i=0,len=this._delayRemoves.length; i<len; i++) {
                this.removeObject(this._delayRemoves[i]);
            }
            this._delayRemoves = [];
        }

	});

	wozllajs.GameObject = GameObject;

})();