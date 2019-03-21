const BLOCK = 'block';
const INLINE_BLOCK = 'inline-block';
const TEXT_COLOR = 'black';
const IMAGE_WIDTH = 50;
const IMAGE_HEIGHT = 20;

class Canvas {
    constructor(canvasEl) {
        this.x = 0;
        this.y = 0;
        this.yInline = 0;

        this.canvasSize = {
            width: canvasEl.width,
            height: canvasEl.height
        };
        this.ctx = canvasEl.getContext('2d');
    }

    clear() {
        this.x = 0;
        this.y = 0;
        this.yInline = 0;
        this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
    }

    drawText(text, {width, color, display} = {}) {
        let x,y;

        display = display || BLOCK;
        width = width || this.canvasSize.width - this.x;
        color = color || TEXT_COLOR;

        switch (display) {
            case BLOCK:
                this.x = 0;
                this.yInline = this.y;

                [x, y] = [this.x, this.y];
                break;
            case INLINE_BLOCK:
                [x, y] = [this.x, this.yInline];
                
                this.x += width;
                if (this.x > this.canvasSize.width) {
                    display = BLOCK;
                    this.x = 0;
                    this.yInline = this.y;

                    [x, y] = [this.x, this.y];
                }
                break;
            default:
                break;
        }

        const {fontSize, lines} = drawMultilineText(this.ctx, text, {
            rect: {
                x,
                y,
                width: width
            },
            verbose: true
        });

        if(display === BLOCK) {
            this.y += lines * fontSize;
            this.yInline = this.y;
        } else {
            this.y = this.yInline + lines * fontSize;
        }
    }


    drawImage(src, {width, height, display} = {}) {
        let x, y;

        width = width || IMAGE_WIDTH;
        height = height || IMAGE_HEIGHT;
        display = display || INLINE_BLOCK;

        switch (display) {
            case BLOCK:
                [x, y] = [0, this.y];

                this.x = 0;

                this.yInline = this.y = this.y + height
                // this.y += height * 2;
                // this.yInline = this.y;

                break;
            case INLINE_BLOCK:
                [x, y] = [this.x, this.yInline];

                this.x += width;
                this.y = this.yInline + height;
                if (this.x > this.canvasSize.width) {
                    this.x = 0;
                    this.y += height;
                    this.yInline = this.y;

                    [x, y] = [this.x, this.y];
                }
                break;
            default:
                break;
        }

        const img = new Image();
        img.addEventListener('load', () => {
            this.ctx.drawImage(img, x, y, width, height);
        });
        img.src = src;
    }
}

export default Canvas;


/****
 * 
 */

function drawMultilineText(ctx, text, opts) {

	// Default options
	if(!opts)
		opts = {}
	if (!opts.font)
		opts.font = 'sans-serif'
	if (typeof opts.stroke == 'undefined')
		opts.stroke = false
	if (typeof opts.verbose == 'undefined')
		opts.verbose = false
	if (!opts.rect)
		opts.rect = {
			x: 0,
			y: 0,
			width: ctx.canvas.width,
			height: ctx.canvas.height
		}
	if (!opts.lineHeight)
		opts.lineHeight = 1.1
	if (!opts.minFontSize)
		opts.minFontSize = 30
	if (!opts.maxFontSize)
		opts.maxFontSize = 100
	// Default log function is console.log - Note: if verbose il false, nothing will be logged anyway
	if (!opts.logFunction)
	 	opts.logFunction = function(message) { console.log(message) }


	const words = text.split(" ")
	if (opts.verbose) opts.logFunction('Text contains ' + words.length + ' words')
	var lines = []

	// Finds max font size  which can be used to print whole text in opts.rec
	for (var fontSize = opts.minFontSize; fontSize <= opts.maxFontSize; fontSize++) {

		// Line height
		var lineHeight = fontSize * opts.lineHeight

		// Set font for testing with measureText()
		ctx.font = " " + fontSize + "px " + opts.font

		// Start
		var x = opts.rect.x
		var y = opts.rect.y + fontSize // It's the bottom line of the letters
		lines = []
		var line = ""

		// Cycles on words
		for (var word of words) {
			// Add next word to line
			var linePlus = line + word + " "
			// If added word exceeds rect width...
			if (ctx.measureText(linePlus).width > (opts.rect.width)) {
				// ..."prints" (save) the line without last word
				lines.push({ text: line, x: x, y: y })
				// New line with ctx last word
				line = word + " "
				y += lineHeight
			} else {
				// ...continues appending words
				line = linePlus
			}
		}

		// "Print" (save) last line
		lines.push({ text: line, x: x, y: y })

		// If bottom of rect is reached then breaks "fontSize" cycle
		if (y > opts.rect.height)
			break

	}

	if (opts.verbose) opts.logFunction("Font used: " + ctx.font)

	// Print lines
	for (var line of lines)
		// Fill or stroke
		if (opts.stroke)
			ctx.strokeText(line.text.trim(), line.x, line.y)
		else
			ctx.fillText(line.text.trim(), line.x, line.y)

	// Returns font size
	return {fontSize, lines: lines.length}

}
