<template>
    <div id="app">
        <div>
            <button @click="selectedRenderer='svg'">svg</button>
            <button @click="selectedRenderer='canvas'">canvas</button>
            selectedRenderer = {{selectedRenderer}}
        </div>
        <component class="drawing-area" :is='`interactive-${selectedRenderer}`'></component>
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
            };
        },
        components: {
            InteractiveSvg,
            InteractiveCanvas,
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
        background: #ddd;
        border: 1px solid gray;
    }
</style>
