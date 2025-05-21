import React, { useState } from 'react';
import { 
  StyleSheet, 
  TextInput, 
  View, 
  Text, 
  TouchableOpacity,
  TextInputProps,
  ScrollView
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from './IconSymbol';

interface CodeInputProps extends TextInputProps {
  label?: string;
  language?: string;
  lineNumbers?: boolean;
  onRun?: () => void;
}

export function CodeInput({
  label,
  language = 'javascript',
  lineNumbers = true,
  onRun,
  style,
  ...props
}: CodeInputProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [isFocused, setIsFocused] = useState(false);
  const lines = (props.value || '').split('\n').length;

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        {label && (
          <Text style={[styles.label, { color: colors.text }]}>
            {label}
          </Text>
        )}
        <View style={styles.languageContainer}>
          <Text style={[styles.language, { color: colors.icon }]}>
            {language}
          </Text>
        </View>
      </View>

      <View 
        style={[
          styles.editorContainer, 
          { 
            backgroundColor: colorScheme === 'dark' ? '#1E1E1E' : '#F5F5F5',
            borderColor: isFocused ? colors.tint : colors.divider 
          }
        ]}
      >
        {lineNumbers && (
          <View style={styles.lineNumbers}>
            {Array.from({ length: Math.max(1, lines) }).map((_, i) => (
              <Text 
                key={i} 
                style={[
                  styles.lineNumber, 
                  { color: colors.placeholderText }
                ]}
              >
                {i + 1}
              </Text>
            ))}
          </View>
        )}
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TextInput
            style={[
              styles.codeInput, 
              { color: colors.text },
              style
            ]}
            multiline
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholderTextColor={colors.placeholderText}
            selectionColor={colors.tint}
            {...props}
          />
        </ScrollView>
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.actionButton, styles.indentButton]}>
          <IconSymbol name="arrow.right.to.line" size={20} color={colors.icon} />
          <Text style={[styles.actionText, { color: colors.icon }]}>Indent</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.actionButton, styles.indentButton]}>
          <IconSymbol name="arrow.left.to.line" size={20} color={colors.icon} />
          <Text style={[styles.actionText, { color: colors.icon }]}>Outdent</Text>
        </TouchableOpacity>
        
        {onRun && (
          <TouchableOpacity 
            style={[styles.actionButton, styles.runButton, { backgroundColor: colors.tint }]}
            onPress={onRun}
          >
            <IconSymbol name="play.fill" size={20} color="#FFFFFF" />
            <Text style={[styles.actionText, { color: '#FFFFFF' }]}>Run</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  languageContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  language: {
    fontSize: 12,
    fontWeight: '500',
  },
  editorContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  lineNumbers: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: 'rgba(0,0,0,0.1)',
  },
  lineNumber: {
    fontSize: 12,
    fontFamily: 'SpaceMono',
    lineHeight: 20,
    textAlign: 'right',
    minWidth: 24,
  },
  codeInput: {
    flex: 1,
    padding: 8,
    paddingBottom: 12,
    fontSize: 14,
    fontFamily: 'SpaceMono',
    lineHeight: 20,
    minHeight: 150,
    maxHeight: 300,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  actionText: {
    fontSize: 14,
    marginLeft: 4,
  },
  indentButton: {
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  runButton: {
    paddingHorizontal: 16,
  },
});
