<template>
    <div id="app">
        <div>
            <button @click="selectedRenderer='svg'">svg</button>
            <button @click="selectedRenderer='canvas'">canvas</button> |
            selectedRenderer = {{selectedRenderer}},
            tick: {{tick}} |
            <label>use rounding: <input type="checkbox" v-model="useRounding"></label>
        </div>
        <component
                class="drawing-area"
                :class="`drawing-area-${selectedRenderer}`"
                :is='`interactive-${selectedRenderer}`'
                :rectangles='rectangles'
                :use-rounding='useRounding'
                @rect-selected='rectSelected'
                @rect-entered='rectEntered'
        />
        <!--<pre>{{rectangles}}</pre>-->
    </div>
</template>

<script>
    import InteractiveSvg from './components/InteractiveSvg';
    import InteractiveCanvas from './components/InteractiveCanvas';

    export default {
        name: 'app',
        data() {
            return {
                selectedRenderer: 'canvas',
                useRounding: true,
                tick: 0,
                timerId: null,
                rectangles: [
                ],  // shared state... not very clean, but it helps here
            };
        },
        components: {
            InteractiveSvg,
            InteractiveCanvas,
        },
        methods: {
            moveRectangles() {
                this.tick += 1;
                this.rectangles.forEach(rect => {
                    rect.x += Math.random() * 20 - 10;
                    rect.y += Math.random() * 20 - 10;
                    rect.width = Math.max(50, rect.width + Math.random() * 10 - 5);
                    rect.height = Math.max(50, rect.height + Math.random() * 10 - 5);
                });
            },
            rectSelected(rect) {
                console.log(`received event, selected rect.id=${rect.id}`);
                console.assert(this.rectangles.filter(r2 => r2 === rect).length === 1);
                rect.selected = !rect.selected;
            },
            rectEntered(rect) {
                console.log(`received event, entered rect.id=${rect.id}`);
            },
        },
        mounted() {
            console.log('mounted()');
            const rectCount = 2000;
            const colors = ['red','blue','green','purple','yellow','pink','gray'];
            for(let i=0; i<rectCount; i++) {
                this.rectangles.push({
                    id: i,
                    color: colors[i % colors.length],
                    x: Math.random() * 750,
                    y: Math.random() * 550,
                    width: 20 + Math.random() * 50,
                    height: 20 + Math.random() * 50,
                    selected: false,
                });
            }
            this.timerId = setInterval(this.moveRectangles.bind(this), 5000);
        },
        beforeDestroy() {
            console.log('beforeDestroy()');
            if (this.timerId) {
                clearInterval(this.timerId);
            }
        },
    };
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .drawing-area {
        width: 800px;
        height: 600px;
        border: 1px solid gray;
    }

    .drawing-area-svg {
        background: #eef;
    }

    .drawing-area-canvas {
        background: #efe;
    }
</style>
