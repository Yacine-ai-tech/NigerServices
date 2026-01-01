import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card } from '../components';
import { Colors, Spacing, FontSize, FontWeight, BorderRadius, Shadow } from '../constants';
import { database } from '../services';
import { Note, RootStackParamList } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'NoteDetail'>;
type RouteProps = RouteProp<RootStackParamList, 'NoteDetail'>;

const NOTE_COLORS = [
  '#FFFFFF',
  '#FFF9C4',
  '#FFE0B2',
  '#F8BBD9',
  '#E1BEE7',
  '#C5CAE9',
  '#B3E5FC',
  '#B2DFDB',
  '#C8E6C9',
];

export const NoteDetailScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { noteId } = route.params || {};

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedColor, setSelectedColor] = useState(NOTE_COLORS[0]);
  const [isPinned, setIsPinned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const isEditMode = !!noteId;

  useEffect(() => {
    if (noteId) {
      loadNote();
    }
  }, [noteId]);

  const loadNote = async () => {
    try {
      const note = await database.getNoteById(noteId!);
      if (note) {
        setTitle(note.title);
        setContent(note.content);
        setSelectedColor(note.color || NOTE_COLORS[0]);
        setIsPinned(note.isPinned);
      }
    } catch (error) {
      console.error('Error loading note:', error);
      Alert.alert('Erreur', 'Impossible de charger la note');
      navigation.goBack();
    }
  };

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) {
      Alert.alert('Note vide', 'Veuillez ajouter un titre ou du contenu');
      return;
    }

    setIsLoading(true);
    try {
      if (isEditMode) {
        await database.updateNote(noteId!, {
          title: title.trim(),
          content: content.trim(),
          color: selectedColor,
          isPinned,
        });
      } else {
        await database.createNote({
          title: title.trim(),
          content: content.trim(),
          color: selectedColor,
          isPinned,
        });
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error saving note:', error);
      Alert.alert('Erreur', 'Impossible de sauvegarder la note');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    if (!isEditMode) return;

    Alert.alert(
      'Supprimer la note',
      'Voulez-vous vraiment supprimer cette note?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              await database.deleteNote(noteId!);
              navigation.goBack();
            } catch (error) {
              console.error('Error deleting note:', error);
              Alert.alert('Erreur', 'Impossible de supprimer la note');
            }
          },
        },
      ]
    );
  };

  const handleGoBack = () => {
    if (hasChanges) {
      Alert.alert(
        'Modifications non sauvegardées',
        'Voulez-vous quitter sans sauvegarder?',
        [
          { text: 'Annuler', style: 'cancel' },
          { text: 'Quitter', style: 'destructive', onPress: () => navigation.goBack() },
          { text: 'Sauvegarder', onPress: handleSave },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  const updateField = (field: 'title' | 'content' | 'color' | 'isPinned', value: any) => {
    setHasChanges(true);
    switch (field) {
      case 'title':
        setTitle(value);
        break;
      case 'content':
        setContent(value);
        break;
      case 'color':
        setSelectedColor(value);
        break;
      case 'isPinned':
        setIsPinned(value);
        break;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: selectedColor }]} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleGoBack}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>

          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => updateField('isPinned', !isPinned)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isPinned ? 'pin' : 'pin-outline'}
                size={22}
                color={isPinned ? Colors.primary : Colors.textSecondary}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => setShowColorPicker(!showColorPicker)}
              activeOpacity={0.7}
            >
              <Ionicons name="color-palette-outline" size={22} color={Colors.textSecondary} />
            </TouchableOpacity>

            {isEditMode && (
              <TouchableOpacity
                style={styles.headerButton}
                onPress={handleDelete}
                activeOpacity={0.7}
              >
                <Ionicons name="trash-outline" size={22} color={Colors.error} />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
              onPress={handleSave}
              disabled={isLoading}
              activeOpacity={0.7}
            >
              <Text style={styles.saveButtonText}>
                {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Color Picker */}
        {showColorPicker && (
          <View style={styles.colorPicker}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.colorList}
            >
              {NOTE_COLORS.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    selectedColor === color && styles.colorOptionSelected,
                  ]}
                  onPress={() => {
                    updateField('color', color);
                    setShowColorPicker(false);
                  }}
                >
                  {selectedColor === color && (
                    <Ionicons name="checkmark" size={16} color={Colors.primary} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Content */}
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <TextInput
            style={styles.titleInput}
            placeholder="Titre"
            placeholderTextColor={Colors.textTertiary}
            value={title}
            onChangeText={(text) => updateField('title', text)}
            maxLength={100}
            autoFocus={!isEditMode}
          />
          <TextInput
            style={styles.contentInput}
            placeholder="Commencez à écrire..."
            placeholderTextColor={Colors.textTertiary}
            value={content}
            onChangeText={(text) => updateField('content', text)}
            multiline
            textAlignVertical="top"
          />
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {content.length} caractères
          </Text>
          {isEditMode && (
            <Text style={styles.footerText}>
              Dernière modification: {new Date().toLocaleDateString('fr-FR')}
            </Text>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.round,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    marginLeft: Spacing.sm,
    ...Shadow.sm,
  },
  saveButtonDisabled: {
    backgroundColor: Colors.textTertiary,
  },
  saveButtonText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.white,
  },
  colorPicker: {
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  colorList: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  colorOption: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.round,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: Spacing.sm,
  },
  colorOptionSelected: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  titleInput: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    padding: 0,
  },
  contentInput: {
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    lineHeight: 24,
    minHeight: 200,
    padding: 0,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  footerText: {
    fontSize: FontSize.xs,
    color: Colors.textTertiary,
  },
});
