<template>
    <svg ref="theSvg"></svg>
</template>

<script>
    import * as d3 from 'd3';

    export default {
        props: {
            rectangles: Array,
        },
        watch: {
            rectangles: {
                handler: function () {
                    this.update();
                },
                deep: true,
            },
        },
        methods: {
            update() {
                console.log('update svg');

                const root = d3.select(this.$refs.theSvg);

                const rects = root.selectAll('rect.drawing-rectangle').data(this.rectangles, rect => rect.id);

                const enterRects = rects.enter()
                    .append('rect')
                    .attr('class', 'drawing-rectangle')
                    .style('fill', d => d.color)
                    .attr('x', d => d.x + d.width / 2)
                    .attr('y', d => d.y + d.height / 2)
                    .attr('width', 0)
                    .attr('height', 0);

                const updateRects = enterRects.merge(rects);

                updateRects
                    .classed('drawing-rectangle__selected', d => d.selected);

                updateRects
                    .transition()
                    .duration(1000)
                    .attr('x', d => d.x)
                    .attr('y', d => d.y)
                    .attr('width', d => d.width)
                    .attr('height', d => d.height);

                rects.exit().remove();

                // events
                const self = this;
                enterRects.on('mouseenter', function(d) {
                     console.log(`mouse entered on rect ${d.id}`);
                     self.$emit('rect-entered', d);
                }).on('click', function(d) {
                     console.log(`clicked on rect ${d.id}`);
                     self.$emit('rect-selected', d);
                });
            },
        },
        mounted() {
            this.update();
        },
    };
</script>

<style>
    svg {
        shape-rendering: crispEdges;
    }

    rect.drawing-rectangle {
        opacity: 0.7;
    }
    rect.drawing-rectangle:hover {
        opacity: 1;
    }
    rect.drawing-rectangle__selected {
        stroke: black;
        stroke-width: 4px;
        stroke-dasharray: 5 5;
    }
</style>
