<template>
    <canvas
            ref="theCanvas"
            width='800'
            height='600'
            @click="canvasClick"
            @mousemove="canvasMouseMove"
    ></canvas>
</template>

<script>
    export default {
        props: {
            rectangles: Array,
            useRounding: Boolean,
        },
        data() {
            return {
                lastPos: {},
            };
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
        computed: {
            canvasRect() {
                return this.$refs.theCanvas.getBoundingClientRect();
            },
        },
        methods: {
            render() {
                console.log('render canvas');
                console.assert(this.$refs.theCanvas);

                const ctx = this.$refs.theCanvas.getContext('2d');
                ctx.resetTransform();
                ctx.clearRect(0, 0, 800, 600);

                const round = this.useRounding
                    ? n => Math.round(n)
                    : n => n;

                this.rectangles.forEach(rect => {
                    const isSelected = rect.selected;
                    const isHovered = this.isInside(this.lastPos, rect);

                    ctx.globalAlpha = isHovered ? 1 : 0.5;
                    ctx.fillStyle = rect.color;
                    ctx.fillRect(round(rect.x), round(rect.y), round(rect.width), round(rect.height));

                    if( isSelected ) {
                        ctx.strokeStyle = 'black';
                        ctx.setLineDash([5,5]);
                        ctx.lineWidth = 5;
                        ctx.strokeRect(round(rect.x), round(rect.y), round(rect.width), round(rect.height));
                    }
                    ctx.globalAlpha = 1;
                });
            },
            isInside(pt, rect) {
                return rect.x <= pt.x && pt.x <= rect.x + rect.width &&
                    rect.y <= pt.y && pt.y <= rect.y + rect.height;
            },
            canvasClick(ev) {
                const canvasRect = this.canvasRect;
                const x = ev.clientX - canvasRect.x;
                const y = ev.clientY - canvasRect.y;
                console.log('clicked on canvas', x, y);
                const clicked = this.rectangles.filter(rect => this.isInside({x, y}, rect));
                if (clicked.length) {
                    this.$emit('rect-selected', clicked[0]);
                }
            },
            canvasMouseMove(ev) {
                const canvasRect = this.canvasRect;
                const x = ev.clientX - canvasRect.x;
                const y = ev.clientY - canvasRect.y;
                console.log('mousemove on canvas', x, y);
                this.lastPos = {x, y};
                this.render();
            },
        },
        mounted() {
            // this.$nextTick(this.render);
            this.render();
        },
    };
</script>

<style>
</style>
