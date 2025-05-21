import { Image } from 'expo-image';
import { StyleSheet, View, FlatList, TouchableOpacity, Text } from 'react-native';
import { useFocusEffect, router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Gradient } from '@/components/ui/Gradient';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { PROJECTS, TEMPLATES } from '@/constants/MockData';
import { TemplateCard } from '@/components/Templates/TemplateCard';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [projects, setProjects] = useState(PROJECTS);
  
  useFocusEffect(
    useCallback(() => {
      // Refresh projects when screen is focused
      setProjects(PROJECTS);
    }, [])
  );

  const handleCreateNewProject = () => {
    router.push('/new-project');
  };

  const handleOpenProject = (projectId: string) => {
    router.push(`/project/${projectId}`);
  };

  const handleSelectTemplate = (templateId: string) => {
    router.push(`/new-project?template=${templateId}`);
  };

  const renderProjectItem = ({ item }: { item: typeof PROJECTS[0] }) => (
    <Card
      title={item.name}
      description={item.description}
      onPress={() => handleOpenProject(item.id)}
      icon={<IconSymbol name="doc.text.image" size={24} color={colors.tint} />}
      rightComponent={
        <View style={styles.progressContainer}>
          <View 
            style={[styles.progressBar, { backgroundColor: colors.divider }]}
          >
            <View 
              style={[
                styles.progressFill, 
                { width: `${item.progress}%`, backgroundColor: colors.tint }
              ]}
            />
          </View>
          <Text style={{ color: colors.icon, fontSize: 12 }}>{item.progress}%</Text>
        </View>
      }
    />
  );

  const renderTemplateItem = ({ item }: { item: typeof TEMPLATES[0] }) => (
    <TemplateCard template={item} onPress={() => handleSelectTemplate(item.id)} />
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Gradient 
          variant="primary" 
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <View>
              <ThemedText type="title">Vibe Coding</ThemedText>
              <Text style={styles.subtitle}>AI-Powered App Creator</Text>
            </View>
            <Image
              source={require('@/assets/images/partial-react-logo.png')}
              style={styles.logo}
              contentFit="contain"
            />
          </View>
        </Gradient>
      </View>

      <FlatList
        data={TEMPLATES.slice(0, 4)}
        renderItem={renderTemplateItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.templateList}
        ListHeaderComponent={
          <>
            <View style={styles.sectionHeader}>
              <ThemedText type="subtitle">Recent Projects</ThemedText>
              <TouchableOpacity>
                <ThemedText style={{ color: colors.tint }}>View All</ThemedText>
              </TouchableOpacity>
            </View>

            {projects.length > 0 ? (
              <FlatList
                data={projects}
                renderItem={renderProjectItem}
                keyExtractor={(item) => item.id}
                horizontal={false}
                scrollEnabled={false}
                style={styles.projectList}
              />
            ) : (
              <View style={styles.emptyStateContainer}>
                <IconSymbol name="doc.badge.plus" size={48} color={colors.icon} />
                <Text style={{ color: colors.text, marginTop: 16, textAlign: 'center' }}>
                  No projects yet. Create your first project to get started!
                </Text>
              </View>
            )}

            <View style={styles.createButton}>
              <Button 
                title="Create New Project" 
                onPress={handleCreateNewProject}
                icon={<IconSymbol name="plus" size={18} color="#FFF" />}
                fullWidth
              />
            </View>

            <View style={styles.sectionHeader}>
              <ThemedText type="subtitle">Popular Templates</ThemedText>
              <TouchableOpacity>
                <ThemedText style={{ color: colors.tint }}>View All</ThemedText>
              </TouchableOpacity>
            </View>
          </>
        }
        ListFooterComponent={
          <TouchableOpacity style={styles.viewMoreCard}>
            <IconSymbol name="arrow.right" size={24} color={colors.tint} />
            <Text style={{ color: colors.text, marginTop: 8 }}>View More</Text>
          </TouchableOpacity>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 200,
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
  logo: {
    width: 100,
    height: 100,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  projectList: {
    paddingHorizontal: 16,
  },
  templateList: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
  },
  progressBar: {
    height: 6,
    width: '100%',
    borderRadius: 3,
    marginBottom: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  createButton: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  viewMoreCard: {
    width: 120,
    height: 160,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 16,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
