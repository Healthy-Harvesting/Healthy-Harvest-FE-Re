import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you are using Expo for icons
import app_colors from '../../constants/app_colors';

const Accordion = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <TouchableOpacity
      onPress={toggleExpanded}
      style={{
        backgroundColor: '#fff',
        elevation: 4,
        paddingHorizontal: 24,
        paddingVertical: 14,
        rowGap: 12,
        borderRadius: 24,
      }}
    >
      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        <Text
          style={{
            color: app_colors?.secondary,
            fontWeight: '600',
            fontSize: 18,
          }}
        >
          {title}
        </Text>
        <Ionicons
          name={expanded ? 'chevron-up-sharp' : 'chevron-down-sharp'}
          size={18}
          color={app_colors.secondary}
        />
      </View>
      {expanded && (
        <View
          onLayout={(event) => setContentHeight(event.nativeEvent.layout.height)}
          style={{ overflow: 'hidden' }}
        >
          {expanded && content}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Accordion;
