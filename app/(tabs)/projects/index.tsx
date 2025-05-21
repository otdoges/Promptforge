import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Button } from '@/components/ui/Button';
import { Gradient } from '@/components/ui/Gradient';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { PROJECTS } from '@/constants/MockData';

export default function ProjectsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [projects] = useState(PROJECTS);
  const [activeFilter, setActiveFilter] = useState<'all' | 'recent' | 'completed'>('all');

  const handleCreateNewProject = () => {
    router.push('/new-project');
  };

  const handleOpenProject = (projectId: string) => {
    router.push(`/project/${projectId}`);
  };

  const filteredProjects = () => {
    switch (activeFilter) {
      case 'recent':
        // Sort by last edited date (newest first)
        return [...projects].sort((a, b) => 
          b.lastEdited.getTime() - a.lastEdited.getTime()
        );
      case 'completed':
        // Filter projects with progress >= 90%
        return projects.filter(project => project.progress >= 90);
      case 'all':
      default:
        return projects;
    }
  };

  const renderProjectItem = ({ item }: { item: typeof PROJECTS[0] }) => (
    <TouchableOpacity 
      style={styles.projectCard}
      onPress={() => handleOpenProject(item.id)}
      activeOpacity={0.8}
    >
      <View style={styles.cardHeader}>
        <IconSymbol 
          name="doc.text.image" 
          size={24} 
          color={colors.icon} 
          style={styles.projectIcon} 
        />
        <ThemedText style={styles.projectName}>{item.name}</ThemedText>
      </View>
      
      <Text style={[styles.projectDescription, { color: colors.icon }]}>
        {item.description}
      </Text>
      
      <View style={styles.cardFooter}>
        <View style={styles.projectMeta}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.template.category}</Text>
          </View>
          <Text style={{ color: colors.icon, fontSize: 12 }}>
            {`Last edited: ${item.lastEdited.toLocaleDateString()}`}
          </Text>
        </View>
        
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
      </View>
      
      <View style={styles.cardActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleOpenProject(item.id)}
        >
          <IconSymbol name="pencil" size={16} color={colors.tint} />
          <Text style={[styles.actionText, { color: colors.tint }]}>Edit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <IconSymbol name="square.and.arrow.up" size={16} color={colors.tint} />
          <Text style={[styles.actionText, { color: colors.tint }]}>Share</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <IconSymbol name="ellipsis" size={16} color={colors.tint} />
          <Text style={[styles.actionText, { color: colors.tint }]}>More</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Gradient 
          variant="secondary" 
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerTitleContainer}>
              <ThemedText type="title">My Projects</ThemedText>
              <Text style={styles.subtitle}>{projects.length} Projects</Text>
            </View>
            <Button
              title="New"
              onPress={handleCreateNewProject}
              icon={<IconSymbol name="plus" size={16} color="#FFF" />}
              variant="primary"
            />
          </View>
        </Gradient>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[
            styles.filterButton, 
            activeFilter === 'all' && [styles.activeFilter, { borderColor: colors.tint }]
          ]}
          onPress={() => setActiveFilter('all')}
        >
          <Text 
            style={[
              styles.filterText, 
              { color: activeFilter === 'all' ? colors.tint : colors.icon }
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.filterButton, 
            activeFilter === 'recent' && [styles.activeFilter, { borderColor: colors.tint }]
          ]}
          onPress={() => setActiveFilter('recent')}
        >
          <Text 
            style={[
              styles.filterText, 
              { color: activeFilter === 'recent' ? colors.tint : colors.icon }
            ]}
          >
            Recent
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.filterButton, 
            activeFilter === 'completed' && [styles.activeFilter, { borderColor: colors.tint }]
          ]}
          onPress={() => setActiveFilter('completed')}
        >
          <Text 
            style={[
              styles.filterText, 
              { color: activeFilter === 'completed' ? colors.tint : colors.icon }
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {filteredProjects().length > 0 ? (
        <FlatList
          data={filteredProjects()}
          renderItem={renderProjectItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.projectsList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyStateContainer}>
          <IconSymbol name="tray" size={60} color={colors.icon} />
          <Text style={[styles.emptyStateText, { color: colors.text }]}>
            No projects found
          </Text>
          <Text style={[styles.emptyStateSubtext, { color: colors.icon }]}>
            {activeFilter === 'all' 
              ? "Let's create your first project!" 
              : `Try switching to a different filter`}
          </Text>
          {activeFilter === 'all' && (
            <View style={styles.emptyStateButton}>
              <Button
                title="Create Project"
                onPress={handleCreateNewProject}
                icon={<IconSymbol name="plus" size={16} color="#FFF" />}
                variant="primary"
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 160,
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
  headerTitleContainer: {
    flex: 1,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    marginTop: 4,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
    marginRight: 8,
  },
  activeFilter: {
    borderWidth: 1,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  projectsList: {
    padding: 16,
    paddingBottom: 40,
    flexDirection: 'column',
  },
  projectCard: {
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  projectIcon: {
    marginRight: 12,
  },
  projectName: {
    fontSize: 18,
    fontWeight: '600',
  },
  projectDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  projectMeta: {
    flex: 1,
  },
  categoryBadge: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
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
  cardActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  actionText: {
    fontSize: 14,
    marginLeft: 4,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  emptyStateButton: {
    marginTop: 16,
  },
});
