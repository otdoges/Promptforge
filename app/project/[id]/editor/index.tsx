import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Button } from '@/components/ui/Button';
import { CodeInput } from '@/components/ui/CodeInput';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Mock code examples
const EXAMPLE_CODE = {
  'App.js': `import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to my app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});`,
  'HomeScreen.js': `import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});`,
  'DetailsScreen.js': `import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function DetailsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details Screen</Text>
      <Button
        title="Go back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});`,
};

export default function CodeEditorScreen() {
  // Project ID is available from the URL params if needed in the future
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [selectedFile, setSelectedFile] = useState<keyof typeof EXAMPLE_CODE>('App.js');
  const [codeContent, setCodeContent] = useState<Record<string, string>>(EXAMPLE_CODE);
  const [isSaving, setIsSaving] = useState(false);

  const handleRunCode = () => {
    // Simulate code execution
    console.log(`Running ${selectedFile}...`);
    // In a real app, we'd connect to a backend service to execute the code
  };

  const handleSaveCode = () => {
    setIsSaving(true);
    // Simulate saving with a delay
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  const handleChangeCode = (newCode: string) => {
    setCodeContent(prev => ({
      ...prev,
      [selectedFile]: newCode
    }));
  };

  const renderFileTab = (fileName: string) => (
    <TouchableOpacity
      key={fileName}
      style={[
        styles.fileTab,
        selectedFile === fileName && [
          styles.activeFileTab,
          { borderBottomColor: colors.tint }
        ]
      ]}
      onPress={() => setSelectedFile(fileName as keyof typeof EXAMPLE_CODE)}
    >
      <View style={styles.fileTabContent}>
        <IconSymbol 
          name="doc.text" 
          size={16} 
          color={selectedFile === fileName ? colors.tint : colors.icon} 
        />
        <Text 
          style={[
            styles.fileTabText,
            { color: selectedFile === fileName ? colors.tint : colors.text }
          ]}
        >
          {fileName}
        </Text>
      </View>
      {selectedFile === fileName && (
        <View 
          style={[
            styles.fileTabIndicator, 
            { backgroundColor: colors.tint }
          ]} 
        />
      )}
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Code Editor',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => router.back()} 
              style={styles.backButton}
            >
              <IconSymbol name="chevron.left" size={24} color={colors.icon} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.headerButtons}>
              <TouchableOpacity 
                style={styles.runButton}
                onPress={handleRunCode}
              >
                <IconSymbol name="play.fill" size={20} color={colors.tint} />
              </TouchableOpacity>
              <Button
                title={isSaving ? "Saving..." : "Save"}
                onPress={handleSaveCode}
                disabled={isSaving}
                variant="primary"
                size="small"
              />
            </View>
          ),
        }}
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.fileTabs}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.fileTabsScrollContent}
          >
            {Object.keys(codeContent).map(renderFileTab)}
            <TouchableOpacity style={styles.addFileButton}>
              <IconSymbol name="plus" size={20} color={colors.icon} />
            </TouchableOpacity>
          </ScrollView>
        </View>
        
        <ScrollView style={styles.editorContainer}>
          <CodeInput
            value={codeContent[selectedFile]}
            onChangeText={handleChangeCode}
            language={selectedFile.endsWith('.js') ? 'javascript' : 'typescript'}
            onRun={handleRunCode}
          />
        </ScrollView>
        
        <View style={[styles.footer, { backgroundColor: colors.background }]}>
          <Text style={{ color: colors.icon, fontSize: 12 }}>
            {`${codeContent[selectedFile].split('\n').length} lines`}
          </Text>
          <View style={styles.footerButtons}>
            <TouchableOpacity style={styles.footerButton}>
              <IconSymbol name="arrow.left.and.right" size={18} color={colors.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton}>
              <IconSymbol name="curlybraces" size={18} color={colors.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton}>
              <IconSymbol name="wand.and.stars" size={18} color={colors.tint} />
              <Text style={[styles.aiText, { color: colors.tint }]}>AI</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    padding: 4,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  runButton: {
    marginRight: 12,
    padding: 4,
  },
  fileTabs: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  fileTabsScrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileTab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    position: 'relative',
  },
  fileTabContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeFileTab: {
    borderBottomWidth: 2,
  },
  fileTabText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  fileTabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
  },
  addFileButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  editorContainer: {
    flex: 1,
    padding: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  footerButtons: {
    flexDirection: 'row',
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  aiText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  }
});
