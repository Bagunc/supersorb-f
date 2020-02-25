function InputCounter(node, config) {
    
    
    let self = this;
    
    this.Node = node || null;
    
    this.initialConfig = {
        value: 0,
        step: 1,
        min: 0,
        max: Infinity,
        node: this.Node,
        onupdate: function(config) {
            // TODO: Colling after update
        },
        filter: function(value) {
            return value;
        }
    };
    
    this.Config = config || {};
    this.Config = Object.assign(this.initialConfig, this.Config);
    
    this.Container = document.createElement('div');
    this.Container.classList.add('counter');
    
    this.Decrement = document.createElement('a');
    this.Decrement.innerHTML = "-";
    
    this.Input = document.createElement('input');
    
    this.Increment = document.createElement('a');
    this.Increment.innerHTML = "+";
    
    if (this.Config.decrement)
        this.Decrement = this.Config.decrement;
    
    if (this.Config.increment)
        this.Increment = this.Config.increment;
        
    
    this.Init = function() {
        if (!self.Node) return;
        
        self.Decrement.addEventListener('click', function(e) {
            e.preventDefault();
            
            self.Config.value -= self.Config.step;
            
            if (self.Config.value < self.Config.min)
                self.Config.value = self.Config.min;
            
            self.Update();

        });

        self.Increment.addEventListener('click', function(e) {
            e.preventDefault();

            self.Config.value += self.Config.step;
            
            if (self.Config.value > self.Config.max)
                self.Config.value = self.Config.max;
            
            self.Update();
        });
        
        self.Input.addEventListener('input', function(e) {
            e.preventDefault();
            
            let value = parseFloat(this.value);
            
            if (value < self.Config.min)
                value = self.Config.min;
            
            if (value > self.Config.max)
                value = self.Config.max;
            
            self.Config.value = value;
            self.Update();
        });
        
        self.Input.getValue = function() {
          
            return self.Config.value;
        };
        
        self.Input.setCounterValue = function (value) {
            if (value < self.Config.min)
                value = self.Config.min;
            
            if (value > self.Config.max)
                value = self.Config.max;
            
            self.Config.value = value;
            self.Update();
        };

        self.Container.append(self.Decrement);
        self.Container.append(self.Input);
        self.Container.append(self.Increment);
        
        self.Node.append(self.Container);
        
        self.Update();
    };
    
    this.Update = function() {
        
        if (isNaN(self.Config.value))
            self.Config.value = 0;
        
        let { value } = self.Config;
        
        if (typeof self.Config.filter === 'function')
            value = self.Config.filter(value);
        
        self.Input.value = value;
        
        if (typeof self.Config.onupdate === 'function')
            self.Config.onupdate(self.Config);
    }
    
    this.Init();
}