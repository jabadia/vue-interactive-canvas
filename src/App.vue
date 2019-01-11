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
                selectedRenderer: 'svg',
                useRounding: true,
                tick: 0,
                timerId: null,
                rectangles: [
                    {id: 1, color: 'red', x: 100, y: 100, width: 200, height: 50, selected: false},
                    {id: 2, color: 'blue', x: 100, y: 300, width: 200, height: 50, selected: false},
                    {id: 3, color: 'green', x: 200, y: 400, width: 50, height: 150, selected: false},
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
                rect.selected = !rect.selected;
            },
            rectEntered(rect) {
                console.log(`received event, entered rect.id=${rect.id}`);
            },
        },
        mounted() {
            console.log('mounted()');
            this.timerId = setInterval(this.moveRectangles.bind(this), 2000);
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
