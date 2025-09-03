// zalgo-effect.js
class ZalgoText {
    constructor() {
        this.diacriticsTop = ['\u030d', '\u030e', '\u0304', '\u0305', '\u033f', 
                             '\u0311', '\u0306', '\u0310', '\u0352', '\u0357',
                             '\u0351', '\u0307', '\u0308', '\u030a', '\u0342', 
                             '\u0343', '\u0344', '\u034a', '\u034b', '\u034c',
                             '\u0303', '\u0302', '\u030c', '\u0350', '\u0300',
                             '\u0301', '\u030b', '\u030f', '\u0312', '\u0313',
                             '\u0314', '\u033d', '\u0309', '\u0363', '\u0364',
                             '\u0365', '\u0366', '\u0367', '\u0368', '\u0369',
                             '\u036a', '\u036b', '\u036c', '\u036d', '\u036e',
                             '\u036f', '\u033e', '\u035b', '\u0346', '\u031a'];
        
        this.diacriticsMid = ['\u0315', '\u031b', '\u0340', '\u0341', '\u0358',
                             '\u0321', '\u0322', '\u0327', '\u0328', '\u0334',
                             '\u0335', '\u0336', '\u034f', '\u035c', '\u035d',
                             '\u035e', '\u035f', '\u0360', '\u0362', '\u0338',
                             '\u0337', '\u0361', '\u0489'];
        
        this.diacriticsBottom = ['\u0316', '\u0317', '\u0318', '\u0319', '\u031c',
                                '\u031d', '\u031e', '\u031f', '\u0320', '\u0324',
                                '\u0325', '\u0326', '\u0329', '\u032a', '\u032b',
                                '\u032c', '\u032d', '\u032e', '\u032f', '\u0330',
                                '\u0331', '\u0332', '\u0333', '\u0339', '\u033a',
                                '\u033b', '\u033c', '\u0345', '\u0347', '\u0348',
                                '\u0349', '\u034d', '\u034e', '\u0353', '\u0354',
                                '\u0355', '\u0356', '\u0359', '\u035a', '\u0323'];
        
        this.intensity = 0.1;
        this.maxIntensity = 0.7;
        this.infectionRate = 0.0005;
        this.active = false;
    }

    getRandomDiacritic(type) {
        switch(type) {
            case 'top':
                return this.diacriticsTop[Math.floor(Math.random() * this.diacriticsTop.length)];
            case 'mid':
                return this.diacriticsMid[Math.floor(Math.random() * this.diacriticsMid.length)];
            case 'bottom':
                return this.diacriticsBottom[Math.floor(Math.random() * this.diacriticsBottom.length)];
        }
    }

    corruptText(text, intensity) {
        if (!text || text.trim().length === 0) return text;
        
        let result = '';
        
        for (let i = 0; i < text.length; i++) {
            result += text[i];
            
            if (text[i].match(/\s/)) continue;
            
            if (Math.random() < intensity) {
                let count = Math.floor(Math.random() * 3) + 1;
                for (let j = 0; j < count; j++) {
                    result += this.getRandomDiacritic('top');
                }
            }
            
            if (Math.random() < intensity / 2) {
                let count = Math.floor(Math.random() * 2) + 1;
                for (let j = 0; j < count; j++) {
                    result += this.getRandomDiacritic('mid');
                }
            }
            
            if (Math.random() < intensity) {
                let count = Math.floor(Math.random() * 3) + 1;
                for (let j = 0; j < count; j++) {
                    result += this.getRandomDiacritic('bottom');
                }
            }
        }
        
        return result;
    }

    increaseIntensity() {
        if (this.intensity < this.maxIntensity) {
            this.intensity += this.infectionRate;
        }
    }

    applyToTextNodes(node) {
        if (node.nodeType === 3) {
            if (node.textContent.trim().length > 0 && 
                !node.parentElement.classList.contains('no-zalgo')) {
                const corrupted = this.corruptText(node.textContent, this.intensity);
                node.textContent = corrupted;
            }
        } else {
            for (let i = 0; i < node.childNodes.length; i++) {
                this.applyToTextNodes(node.childNodes[i]);
            }
        }
    }

    start() {
        if (this.active) return;
        this.active = true;
        
        setInterval(() => {
            this.increaseIntensity();
            this.applyToTextNodes(document.body);
        }, 3000);
    }

    stop() {
        this.active = false;
    }
}

export { ZalgoText };