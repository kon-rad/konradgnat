const DATA_URL =
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';

const initChart = (dataset) => {
    const { baseTemperature, monthlyVariance } = dataset;

    const COLORS = [
        '#a50026',
        '#d73027',
        '#f46d43',
        '#fdae61',
        '#fee090',
        '#e0f3f8',
        '#abd9e9',
        '#74add1',
        '#4575b4',
        '#313695'
    ];

    const minYear = d3.min(monthlyVariance, (d) => d.year);
    const maxYear = d3.max(monthlyVariance, (d) => d.year);
    const squareWidth = 4;
    const squareHeight = 28;
    const padding = 0;
    const verticalPadding = 60;
    const margin = { top: 80, right: 65, bottom: 30, left: 60 };

    document.getElementById('startYear').innerHTML = minYear;
    document.getElementById('endYear').innerHTML = maxYear;
    document.getElementById('baseTemp').innerHTML = baseTemperature;

    const width = (maxYear - minYear) * (squareWidth + padding);
    const height = 12 * (squareHeight + padding);

    const section = d3.select('#svg_container').append('section');

    // append the svg object to the body of the page
    const svg = section
        .append('svg')
        .attr('width', width + (margin.left + margin.right))
        .attr('height', height + (margin.top + margin.bottom) + 300)
        .append('g')
        .attr(
            'transform',
            'translate(' + margin.left + ',' + margin.right + ')'
        );

    const yDomain = [];
    const xDomain = [];
    const variance = [];
    monthlyVariance.forEach((item) => {
        yDomain.push(item.month);
        xDomain.push(item.year);
        variance.push(item.variance);
    });

    // X-Axis
    const xScale = d3
        .scaleBand()
        .domain(xDomain)
        .range([0, width])
        .padding(0.01);

    const xAxis = d3
        .axisBottom(xScale)
        .tickValues(
            xScale.domain().filter((year) => {
                // set ticks to years divisible by 10
                return year % 10 === 0;
            })
        )
        .tickFormat((year) => {
            const date = new Date(year, 0);
            const tick = d3.timeFormat('%Y')(date);
            return tick;
        });
    svg.append('g')
        .attr('transform', 'translate(0, ' + height + ')')
        .attr('id', 'x-axis')
        .attr('class', 'x-axis')
        .call(xAxis)
        .selectAll('text')
        .attr('dx', '-.8em')
        .attr('dy', '.15em')
        .attr('transform', 'rotate(-65)')
        .style('text-anchor', 'end');

    const yScale = d3
        .scaleBand()
        .range([height, 0])
        .domain(yDomain)
        .padding(0.01);

    const monthMap = {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December'
    };

    // create a tooltip
    const Tooltip = d3
        .select('#svg_container')
        .append('div')
        .attr('class', 'dataviz__tooltip')
        .attr('id', 'dataviz__tooltip');

    const yAxis = d3
        .axisLeft()
        .scale(yScale)
        .tickFormat((d) => monthMap[d]);

    svg.append('g').call(yAxis).attr('id', 'y-axis');

    // build a color scale
    const minVariance = d3.min(monthlyVariance, (d) => d.variance);
    const maxVariance = d3.max(monthlyVariance, (d) => d.variance);
    const colorScale = d3
        .scaleLinear()
        .domain([minVariance, maxVariance])
        .range([COLORS.length, 0]);

    // Three function that change the tooltip when user hover / move / leave a cell
    const mouseover = function (d) {
        Tooltip.style('display', 'flex');
    };
    const mousemove = function (d) {
        const data = [
            `Date: ${d.srcElement.__data__.month}/` +
                `${d.srcElement.__data__.year} `,
            `Temp: ${(baseTemperature + d.srcElement.__data__.variance).toFixed(
                2
            )}&deg;C `,
            `Variance: ${d.srcElement.__data__.variance}`
        ];
        Tooltip.html(data.join('</br>'))
            .style('left', d3.pointer(d)[0] + 10 + margin.right + 'px')
            .style('top', d3.pointer(d)[1] - 28 + margin.top + 'px')
            .attr('data-year', d.srcElement.__data__.year);
    };
    const mouseleave = function (d) {
        Tooltip.style('display', 'none');
    };
    const onclick = function (d) {
        window.open(d.srcElement.__data__.URL, '_blank');
    };

    // create rectangles for heat map chart
    svg.selectAll('rect')
        .data(monthlyVariance)
        .enter()
        .append('rect')
        .attr('class', 'cell')
        .attr('x', (d) => padding + xScale(d.year))
        .attr('y', (d) => padding + yScale(d.month))
        .attr('width', squareWidth)
        .attr('height', squareHeight)
        .attr('data-year', (d) => d.year)
        .attr('data-month', (d) => d.month - 1)
        .attr('data-temp', (d) => d.variance + baseTemperature)
        .attr('fill', (d) => COLORS[Math.floor(colorScale(d.variance))])
        .on('mouseover', mouseover)
        .on('mouseleave', mouseleave)
        .on('mousemove', mousemove);

    // Add legend
    // Follow example from https://bl.ocks.org/mbostock/4573883
    // to draw the legend
    const varianceDiff = Math.abs(maxVariance) + Math.abs(minVariance);
    const step = varianceDiff / COLORS.length;

    const legendWidth = 400;
    const legendHeight = 40;

    const legendTopMargin = 60;
    const legendTextMargin = 34;
    const legendSquareWidth = 35;
    const legendSquareHeight = 20;

    const minTemp = baseTemperature + minVariance;
    const maxTemp = baseTemperature + maxVariance;

    const legendThreshold = d3
        .scaleThreshold()
        .domain(
            ((min, max, count) => {
                const arr = [];
                const step = (max - min) / count;
                const base = min;
                for (let i = 1; i < count; i++) {
                    arr.push(base + i * step);
                }
                return arr;
            })(minTemp, maxTemp, COLORS.length)
        )
        .range(COLORS);

    const legendX = d3
        .scaleLinear()
        .domain([minTemp, maxTemp])
        .range([0, legendWidth]);

    const legendXAxis = d3
        .axisBottom()
        .scale(legendX)
        .tickSize(10, 0)
        .tickValues(legendThreshold.domain())
        .tickFormat(d3.format('.1f'));

    const legendpadding = {
        left: '10',
        top: '10',
        right: '10',
        bottom: '10'
    };
    const legend = svg
        .append('g')
        .classed('legend', true)
        .attr('id', 'legend')
        .attr(
            'transform',
            'translate(' +
                legendpadding.left +
                ',' +
                (height + legendTopMargin) +
                ')'
        );

    legend
        .append('g')
        .selectAll('rect')
        .data(
            legendThreshold.range().map(function (color) {
                const d = legendThreshold.invertExtent(color);
                if (d[0] === null) {
                    d[0] = legendX.domain()[0];
                }
                if (d[1] === null) {
                    d[1] = legendX.domain()[1];
                }
                return d;
            })
        )
        .enter()
        .append('rect')
        .style('fill', (d) => legendThreshold(d[0]))
        .attr('x', (d) => legendX(d[0]))
        .attr('y', 0)
        .attr('height', legendHeight)
        .attr('width', (d, i) => {
            // fixes console error when first and last data point is undefined
            return d[1] && d[0] ? legendX(d[1]) - legendX(d[0]) : 0;
        });

    legend
        .append('g')
        .attr('transform', 'translate(' + 0 + ', ' + legendHeight + ')')
        .call(legendXAxis);
};

const initApp = () => {
    fetch(DATA_URL)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
            throw Error('Request for data failed');
        })
        .then((data) => {
            console.log(data);
            initChart(data);
        });
};
document.addEventListener('DOMContentLoaded', initApp);
