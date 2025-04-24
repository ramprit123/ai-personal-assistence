import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import Animated, { FadeIn, FadeInRight, Layout } from 'react-native-reanimated';
import { COLORS } from '../constants';

// Simple donut chart component (in a real app would use a charting library)
const DonutChart = ({
  data,
}: {
  data: Array<{ value: number; color: string }>;
}) => {
  const width = 150;
  const height = 150;
  const radius = Math.min(width, height) / 2;
  const centerX = width / 2;
  const centerY = height / 2;

  // Calculate paths for the donut segments
  const createDonutSegment = (
    startAngle: number,
    endAngle: number,
    color: string
  ) => {
    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);

    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

    const pathData = [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z',
    ].join(' ');

    return <Path key={startAngle} d={pathData} fill={color} />;
  };

  let currentAngle = 0;
  const segments = data.map((item) => {
    const startAngle = currentAngle;
    const angleValue = (item.value / 100) * (2 * Math.PI);
    currentAngle += angleValue;

    return createDonutSegment(startAngle, currentAngle, item.color);
  });

  return (
    <Svg width={width} height={height}>
      <G>
        {segments}
        <Circle cx={centerX} cy={centerY} r={radius * 0.6} fill="white" />
      </G>
    </Svg>
  );
};

// Circle component for SVG
const Circle = ({
  cx,
  cy,
  r,
  fill,
}: {
  cx: number;
  cy: number;
  r: number;
  fill: string;
}) => (
  <Path
    d={`M ${cx - r} ${cy} a ${r} ${r} 0 1 0 ${r * 2} 0 a ${r} ${r} 0 1 0 ${
      -r * 2
    } 0`}
    fill={fill}
  />
);

export const CategoryBreakdown = () => {
  // Sample data for the donut chart
  const categoryData = [
    { category: 'Food', value: 30, color: '#FF9500' },
    { category: 'Transport', value: 20, color: '#FF2D55' },
    { category: 'Shopping', value: 25, color: '#5AC8FA' },
    { category: 'Bills', value: 15, color: '#5856D6' },
    { category: 'Other', value: 10, color: '#FFCC00' },
  ];

  return (
    <Animated.View
      style={styles.container}
      entering={FadeIn}
      layout={Layout.springify()}
    >
      <Text style={styles.title}>Spending by Category</Text>

      <View style={styles.chartContainer}>
        <Animated.View entering={FadeIn.delay(300)}>
          <DonutChart data={categoryData} />
        </Animated.View>

        <View style={styles.legend}>
          {categoryData.map((item, index) => (
            <Animated.View
              key={item.category}
              style={styles.legendItem}
              entering={FadeInRight.delay(index * 100)}
            >
              <View
                style={[styles.colorBox, { backgroundColor: item.color }]}
              />
              <Text style={styles.categoryText}>{item.category}</Text>
              <Text style={styles.percentText}>{item.value}%</Text>
            </Animated.View>
          ))}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 16,
    color: '#1C1C1E',
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  legend: {
    flex: 1,
    marginLeft: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  colorBox: {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginRight: 8,
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1C1C1E',
    flex: 1,
  },
  percentText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#8E8E93',
  },
});