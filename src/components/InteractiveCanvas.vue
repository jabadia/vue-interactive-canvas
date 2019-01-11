<template>
    <canvas
        ref="theCanvas"
        width='800'
        height='600'
    ></canvas>
</template>

<script>
    export default {
        props: {
            rectangles: Array,
            useRounding: Boolean,
        },
        watch: {
            rectangles: {
                handler: function () {
                    this.render();
                },
                deep: true,
            },
            useRounding() {
                this.render();
            },
        },
        methods: {
            render() {
                console.log('render canvas');
                console.assert(this.$refs.theCanvas);

                const ctx = this.$refs.theCanvas.getContext('2d');
                ctx.resetTransform();
                ctx.clearRect(0,0,800,600);

                const round = this.useRounding
                    ? n => Math.round(n)
                    : n => n;

                this.rectangles.forEach(rect => {
                    ctx.fillStyle = rect.color;
                    ctx.fillRect(round(rect.x), round(rect.y), round(rect.width), round(rect.height));
                });
            },
        },
        mounted() {
            this.$nextTick(this.render);
        },
    };
</script>

<style>
</style>
