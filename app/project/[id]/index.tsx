import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Dimensions
} from 'react-native';
import { router, useLocalSearchParams, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Button } from '@/components/ui/Button';

import { ChatInterface } from '@/components/Chat/ChatInterface';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { PROJECTS, SYSTEM_PROMPTS } from '@/constants/MockData';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function ProjectDetailScreen() {
  const params = useLocalSearchParams();
  const projectId = params.id as string;
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [project] = useState(PROJECTS.find(p => p.id === projectId));
  const [activeTab, setActiveTab] = useState<'overview' | 'chat' | 'settings'>('overview');

  if (!project) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <IconSymbol name="exclamationmark.triangle" size={60} color={colors.icon} />
        <Text style={[styles.notFoundText, { color: colors.text }]}>Project not found</Text>
        <View style={{ marginTop: 16 }}>
          <Button
            title="Go Back"
            onPress={() => router.back()}
            variant="outline"
          />
        </View>
      </View>
    );
  }

  const handleSendMessage = async (message: string): Promise<string> => {
    // This would normally call an API to get a response from an AI model
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`I'll help you with your ${project.name} project. ${message.includes('feature') ? 'For that feature, you might want to consider using the following components...' : 'What specific part of the app would you like to work on?'}`);
      }, 1000);
    });
  };

  const renderOverviewTab = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Project Details</Text>
        
        <View style={styles.detailRow}>
          <IconSymbol name="tag" size={20} color={colors.icon} />
          <Text style={[styles.detailLabel, { color: colors.icon }]}>Template:</Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>{project.template.name}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <IconSymbol name="calendar" size={20} color={colors.icon} />
          <Text style={[styles.detailLabel, { color: colors.icon }]}>Created:</Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>{project.lastEdited.toLocaleDateString()}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <IconSymbol name="tag.fill" size={20} color={colors.icon} />
          <Text style={[styles.detailLabel, { color: colors.icon }]}>Category:</Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>{project.template.category}</Text>
        </View>
        
        <View style={[styles.progressContainer, { marginTop: 16 }]}>
          <View style={styles.progressHeader}>
            <Text style={[styles.progressLabel, { color: colors.text }]}>Progress</Text>
            <Text style={{ color: colors.icon }}>{project.progress}%</Text>
          </View>
          
          <View style={[styles.progressBar, { backgroundColor: colors.divider }]}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${project.progress}%`, 
                  backgroundColor: colors.tint 
                }
              ]}
            />
          </View>
        </View>
      </View>
      
      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Preview</Text>
        <View style={styles.previewContainer}>
          <Image 
            source={{ uri: project.template.imageUri }} 
            style={styles.previewImage}
            resizeMode="cover"
          />
          
          <View style={styles.previewOverlay}>
            <Button
              title="Preview App"
              icon={<IconSymbol name="play.fill" size={16} color="#FFF" />}
              variant="primary"
              onPress={() => {}}
            />
          </View>
        </View>
      </View>
      
      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Components</Text>
        
        <View style={styles.componentsList}>
          <TouchableOpacity style={styles.componentCard}>
            <IconSymbol name="rectangle.3.group" size={24} color={colors.tint} />
            <Text style={[styles.componentName, { color: colors.text }]}>Screens</Text>
            <Text style={{ color: colors.icon, fontSize: 12 }}>4 screens</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.componentCard}>
            <IconSymbol name="square.on.circle" size={24} color={colors.secondary} />
            <Text style={[styles.componentName, { color: colors.text }]}>UI Components</Text>
            <Text style={{ color: colors.icon, fontSize: 12 }}>12 components</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.componentCard}>
            <IconSymbol name="arrow.triangle.branch" size={24} color={colors.accent} />
            <Text style={[styles.componentName, { color: colors.text }]}>Navigation</Text>
            <Text style={{ color: colors.icon, fontSize: 12 }}>Stack & Tabs</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.componentCard}>
            <IconSymbol name="server.rack" size={24} color={colors.tint} />
            <Text style={[styles.componentName, { color: colors.text }]}>API Services</Text>
            <Text style={{ color: colors.icon, fontSize: 12 }}>3 services</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={[styles.sectionContainer, { marginBottom: 24 }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Deployment</Text>
        <View style={{ marginTop: 8 }}>
          <Button
            title="Build & Deploy"
            icon={<IconSymbol name="arrow.up.forward.app" size={18} color="#FFF" />}
            variant="primary"
            onPress={() => {}}
          />
        </View>
      </View>
    </ScrollView>
  );

  const renderChatTab = () => (
    <View style={styles.chatContainer}>
      <ChatInterface 
        systemPrompt={SYSTEM_PROMPTS[0].content}
        onSendMessage={handleSendMessage}
        placeholder={`Ask for help with your ${project.name} project...`}
      />
    </View>
  );

  const renderSettingsTab = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>General Settings</Text>
        
        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingContent}>
            <IconSymbol name="pencil" size={20} color={colors.icon} />
            <Text style={[styles.settingLabel, { color: colors.text }]}>Edit Project Details</Text>
          </View>
          <IconSymbol name="chevron.right" size={20} color={colors.icon} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingContent}>
            <IconSymbol name="folder.badge.gearshape" size={20} color={colors.icon} />
            <Text style={[styles.settingLabel, { color: colors.text }]}>Project Configuration</Text>
          </View>
          <IconSymbol name="chevron.right" size={20} color={colors.icon} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingContent}>
            <IconSymbol name="person.2" size={20} color={colors.icon} />
            <Text style={[styles.settingLabel, { color: colors.text }]}>Collaborators</Text>
          </View>
          <IconSymbol name="chevron.right" size={20} color={colors.icon} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Export & Share</Text>
        
        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingContent}>
            <IconSymbol name="square.and.arrow.down" size={20} color={colors.icon} />
            <Text style={[styles.settingLabel, { color: colors.text }]}>Export Project</Text>
          </View>
          <IconSymbol name="chevron.right" size={20} color={colors.icon} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingRow}>
          <View style={styles.settingContent}>
            <IconSymbol name="link" size={20} color={colors.icon} />
            <Text style={[styles.settingLabel, { color: colors.text }]}>Share Link</Text>
          </View>
          <IconSymbol name="chevron.right" size={20} color={colors.icon} />
        </TouchableOpacity>
      </View>
      
      <View style={[styles.sectionContainer, { marginBottom: 40 }]}>
        <Text style={[styles.sectionTitle, { color: '#FF3B30' }]}>Danger Zone</Text>
        
        <TouchableOpacity style={[styles.settingRow, { borderBottomWidth: 0 }]}>
          <View style={styles.settingContent}>
            <IconSymbol name="trash" size={20} color="#FF3B30" />
            <Text style={[styles.settingLabel, { color: '#FF3B30' }]}>Delete Project</Text>
          </View>
          <IconSymbol name="chevron.right" size={20} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: project.name,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <IconSymbol name="chevron.left" size={24} color={colors.icon} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.moreButton}>
              <IconSymbol name="ellipsis" size={24} color={colors.icon} />
            </TouchableOpacity>
          ),
        }}
      />
      
      <View style={styles.container}>
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeTab === 'overview' && [styles.activeTab, { borderBottomColor: colors.tint }]
            ]}
            onPress={() => setActiveTab('overview')}
          >
            <Text 
              style={[
                styles.tabText, 
                { color: activeTab === 'overview' ? colors.tint : colors.icon }
              ]}
            >
              Overview
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeTab === 'chat' && [styles.activeTab, { borderBottomColor: colors.tint }]
            ]}
            onPress={() => setActiveTab('chat')}
          >
            <Text 
              style={[
                styles.tabText, 
                { color: activeTab === 'chat' ? colors.tint : colors.icon }
              ]}
            >
              AI Chat
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeTab === 'settings' && [styles.activeTab, { borderBottomColor: colors.tint }]
            ]}
            onPress={() => setActiveTab('settings')}
          >
            <Text 
              style={[
                styles.tabText, 
                { color: activeTab === 'settings' ? colors.tint : colors.icon }
              ]}
            >
              Settings
            </Text>
          </TouchableOpacity>
        </View>
        
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'chat' && renderChatTab()}
        {activeTab === 'settings' && renderSettingsTab()}
        
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </View>
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
  moreButton: {
    padding: 4,
  },
  notFoundText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontWeight: '600',
    fontSize: 14,
  },
  tabContent: {
    flex: 1,
    padding: 16,
  },
  sectionContainer: {
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    marginLeft: 8,
    marginRight: 4,
    width: 70,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  progressContainer: {
    width: '100%',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressBar: {
    height: 8,
    width: '100%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  previewContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  previewOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  componentsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  componentCard: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  componentName: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
    marginBottom: 4,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 14,
    marginLeft: 12,
  },
  chatContainer: {
    flex: 1,
  },
});
