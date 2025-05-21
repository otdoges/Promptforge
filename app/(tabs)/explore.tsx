
import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import { Gradient } from '@/components/ui/Gradient';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SYSTEM_PROMPTS } from '@/constants/MockData';
import { ChatInterface } from '@/components/Chat/ChatInterface';

export default function ExploreScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [activeTab, setActiveTab] = useState<'models' | 'chat' | 'prompts'>('models');
  const [selectedPrompt, setSelectedPrompt] = useState<typeof SYSTEM_PROMPTS[0] | null>(null);
  
  const handleSelectPrompt = (prompt: typeof SYSTEM_PROMPTS[0]) => {
    setSelectedPrompt(prompt);
    setActiveTab('chat');
  };

  const handleSendMessage = async (message: string): Promise<string> => {
    // This would normally call an API to get a response from an AI model
    // For now, we'll simulate a response after a short delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`I received your message: "${message}". Here's how we could approach this in React Native and Expo...`);
      }, 1000);
    });
  };

  const renderModelSection = () => (
    <ScrollView style={styles.tabContent}>
      <ThemedText>GitHub offers a variety of AI models that can help you create amazing apps:</ThemedText>
      
      <View style={styles.modelCard}>
        <Gradient variant="primary" style={styles.modelBanner}>
          <Text style={styles.modelBannerText}>Recommended Models</Text>
        </Gradient>
        
        <Card
          title="GitHub Copilot"
          description="Your AI pair programmer that helps you write better code faster"
          icon={<IconSymbol name="sparkles" size={24} color={colors.tint} />}
          variant="highlight"
          onPress={() => {}}
        />

        <Card
          title="CodeWhisperer"
          description="AI-powered code suggestions to improve development productivity"
          icon={<IconSymbol name="wand.and.stars" size={24} color={colors.secondary} />}
          onPress={() => {}}
        />

        <Card
          title="Anthropic Claude"
          description="Advanced reasoning and code generation capabilities"
          icon={<IconSymbol name="brain" size={24} color={colors.accent} />}
          onPress={() => {}}
        />

        <Card
          title="GPT-4"
          description="Powerful language model for text and code generation"
          icon={<IconSymbol name="text.bubble" size={24} color={colors.tint} />}
          onPress={() => {}}
        />

        <Button
          title="Browse GitHub Marketplace"
          variant="outline"
          onPress={() => {}}
          icon={<IconSymbol name="arrow.right" size={18} color={colors.tint} />}
          iconPosition="right"
        />
      </View>
    </ScrollView>
  );

  const renderPromptSection = () => (
    <ScrollView style={styles.tabContent}>
      <ThemedText style={styles.sectionDescription}>
        System prompts help guide AI models to generate better results for specific tasks.
        Select a prompt to start coding with AI assistance:
      </ThemedText>
      
      {SYSTEM_PROMPTS.map((prompt) => (
        <TouchableOpacity 
          key={prompt.id} 
          style={styles.promptCard}
          onPress={() => handleSelectPrompt(prompt)}
          activeOpacity={0.8}
        >
          <View style={styles.promptHeader}>
            <IconSymbol 
              name="text.badge.checkmark" 
              size={22} 
              color={colors.tint} 
              style={styles.promptIcon} 
            />
            <Text style={[styles.promptTitle, { color: colors.text }]}>{prompt.name}</Text>
          </View>
          <Text 
            style={[styles.promptContent, { color: colors.icon }]} 
            numberOfLines={3}
          >
            {prompt.content}
          </Text>
          <View style={styles.promptFooter}>
            <Text style={{ color: colors.icon, fontSize: 12 }}>Tap to use</Text>
            <IconSymbol name="chevron.right" size={16} color={colors.icon} />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderChatSection = () => (
    <View style={styles.chatContainer}>
      {selectedPrompt ? (
        <>
          <View style={styles.chatHeader}>
            <Text style={[styles.chatHeaderTitle, { color: colors.text }]}>
              {selectedPrompt.name}
            </Text>
            <TouchableOpacity 
              style={styles.changePromptButton}
              onPress={() => setActiveTab('prompts')}
            >
              <Text style={{ color: colors.tint, fontSize: 14 }}>Change</Text>
            </TouchableOpacity>
          </View>
          <ChatInterface 
            systemPrompt={selectedPrompt.content}
            onSendMessage={handleSendMessage}
          />
        </>
      ) : (
        <View style={styles.emptyChatState}>
          <IconSymbol name="bubble.left.and.bubble.right" size={60} color={colors.icon} />
          <Text style={[styles.emptyChatText, { color: colors.text }]}>
            Select a system prompt to start chatting
          </Text>
          <Button
            title="Browse Prompts"
            onPress={() => setActiveTab('prompts')}
            variant="primary"
          />
        </View>
      )}
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Gradient 
          variant="accent" 
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <View>
              <ThemedText type="title">AI Tools</ThemedText>
              <Text style={styles.subtitle}>Powered by GitHub Models</Text>
            </View>
            <IconSymbol
              size={60}
              color="#FFFFFF"
              name="square.stack.3d.up"
            />
          </View>
        </Gradient>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'models' && [styles.activeTab, { borderBottomColor: colors.tint }]
          ]}
          onPress={() => setActiveTab('models')}
        >
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'models' ? colors.tint : colors.icon }
            ]}
          >
            Models
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'prompts' && [styles.activeTab, { borderBottomColor: colors.tint }]
          ]}
          onPress={() => setActiveTab('prompts')}
        >
          <Text 
            style={[
              styles.tabText, 
              { color: activeTab === 'prompts' ? colors.tint : colors.icon }
            ]}
          >
            Prompts
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
            Chat
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'models' && renderModelSection()}
      {activeTab === 'prompts' && renderPromptSection()}
      {activeTab === 'chat' && renderChatSection()}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 170,
    overflow: 'hidden',
  },
  headerGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingTop: 60,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    marginTop: 4,
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
    fontSize: 16,
  },
  tabContent: {
    flex: 1,
    padding: 16,
  },
  sectionDescription: {
    marginBottom: 16,
    lineHeight: 22,
  },
  modelBanner: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  modelBannerText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  modelCard: {
    marginTop: 16,
    gap: 12,
  },
  promptCard: {
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  promptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  promptIcon: {
    marginRight: 8,
  },
  promptTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  promptContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  promptFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatContainer: {
    flex: 1,
  },
  emptyChatState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 16,
  },
  emptyChatText: {
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 16,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  chatHeaderTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  changePromptButton: {
    padding: 8,
  },
});
