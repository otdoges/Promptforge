import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Gradient } from '@/components/ui/Gradient';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TEMPLATES, SYSTEM_PROMPTS } from '@/constants/MockData';
import { Template } from '@/components/Templates/TemplateCard';

export default function NewProjectScreen() {
  const params = useLocalSearchParams();
  const templateId = params.template as string | undefined;
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState(SYSTEM_PROMPTS[0]);
  const [isCreating, setIsCreating] = useState(false);
  const [nameError, setNameError] = useState('');

  useEffect(() => {
    if (templateId) {
      const template = TEMPLATES.find(t => t.id === templateId);
      if (template) {
        setSelectedTemplate(template);
        setProjectName(`My ${template.name}`);
        setProjectDescription(template.description);
      }
    }
  }, [templateId]);

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setProjectName(`My ${template.name}`);
    setProjectDescription(template.description);
  };

  const handleSelectPrompt = (prompt: typeof SYSTEM_PROMPTS[0]) => {
    setSelectedPrompt(prompt);
  };

  const validateForm = () => {
    let isValid = true;
    
    if (!projectName.trim()) {
      setNameError('Project name is required');
      isValid = false;
    } else {
      setNameError('');
    }
    
    return isValid;
  };

  const handleCreateProject = () => {
    if (!validateForm()) return;
    
    setIsCreating(true);
    
    // Simulating project creation
    setTimeout(() => {
      setIsCreating(false);
      // Navigate to the project page or home
      router.replace('/');
    }, 2000);
  };

  const renderTemplateItem = (template: Template) => (
    <TouchableOpacity
      key={template.id}
      style={[
        styles.templateItem,
        selectedTemplate?.id === template.id && [
          styles.selectedTemplateItem, 
          { borderColor: colors.tint }
        ]
      ]}
      onPress={() => handleSelectTemplate(template)}
    >
      <View style={styles.templateIconContainer}>
        <IconSymbol 
          name="doc.text.image" 
          size={24} 
          color={selectedTemplate?.id === template.id ? colors.tint : colors.icon} 
        />
      </View>
      <Text 
        style={[
          styles.templateName, 
          { color: colors.text }
        ]}
        numberOfLines={1}
      >
        {template.name}
      </Text>
    </TouchableOpacity>
  );

  const renderPromptItem = (prompt: typeof SYSTEM_PROMPTS[0]) => (
    <TouchableOpacity
      key={prompt.id}
      style={[
        styles.promptItem,
        selectedPrompt.id === prompt.id && [
          styles.selectedPromptItem, 
          { borderColor: colors.tint }
        ]
      ]}
      onPress={() => handleSelectPrompt(prompt)}
    >
      <View style={styles.promptHeader}>
        <Text 
          style={[
            styles.promptName, 
            { 
              color: selectedPrompt.id === prompt.id ? colors.tint : colors.text 
            }
          ]}
        >
          {prompt.name}
        </Text>
        {selectedPrompt.id === prompt.id && (
          <IconSymbol name="checkmark.circle.fill" size={18} color={colors.tint} />
        )}
      </View>
      <Text 
        style={[styles.promptDescription, { color: colors.icon }]}
        numberOfLines={2}
      >
        {prompt.content}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: 'New Project',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <IconSymbol name="xmark" size={24} color={colors.icon} />
            </TouchableOpacity>
          ),
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Project Information</Text>
            
            <Input
              label="Project Name"
              value={projectName}
              onChangeText={setProjectName}
              placeholder="Enter project name"
              error={nameError}
              leftIcon={<IconSymbol name="textformat" size={20} color={colors.icon} />}
              containerStyle={styles.inputContainer}
            />
            
            <Input
              label="Description"
              value={projectDescription}
              onChangeText={setProjectDescription}
              placeholder="Describe your project"
              multiline
              numberOfLines={3}
              leftIcon={<IconSymbol name="text.alignleft" size={20} color={colors.icon} />}
              containerStyle={styles.inputContainer}
            />
            
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Template</Text>
            <Text style={[styles.sectionDescription, { color: colors.icon }]}>
              Choose a starting point for your app
            </Text>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.templatesContainer}
            >
              {TEMPLATES.map(renderTemplateItem)}
            </ScrollView>
            
            <Text style={[styles.sectionTitle, { color: colors.text }]}>AI Assistant</Text>
            <Text style={[styles.sectionDescription, { color: colors.icon }]}>
              Select the AI personality that will help you build your app
            </Text>
            
            <View style={styles.promptsContainer}>
              {SYSTEM_PROMPTS.map(renderPromptItem)}
            </View>
          </View>
        </ScrollView>
        
        <Gradient style={styles.footerGradient}>
          <View style={styles.footer}>
            <Button
              title={isCreating ? "Creating Project..." : "Create Project"}
              onPress={handleCreateProject}
              disabled={!selectedTemplate || isCreating}
              loading={isCreating}
              fullWidth
            />
          </View>
        </Gradient>
        
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  backButton: {
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
  },
  sectionDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 8,
  },
  templatesContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  templateItem: {
    width: 100,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.03)',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedTemplateItem: {
    borderWidth: 2,
  },
  templateIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  templateName: {
    fontSize: 14,
    textAlign: 'center',
  },
  promptsContainer: {
    marginTop: 8,
  },
  promptItem: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.03)',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedPromptItem: {
    borderWidth: 2,
  },
  promptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  promptName: {
    fontSize: 16,
    fontWeight: '600',
  },
  promptDescription: {
    fontSize: 14,
  },
  footerGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    borderRadius: 0,
  },
  footer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 30 : 20,
  },
});
