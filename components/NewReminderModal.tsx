import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  TextInput, 
  Platform
} from 'react-native';
import { X, Calendar, Clock, ChevronDown } from 'lucide-react-native';
import { COLORS } from '../constants';

type NewReminderModalProps = {
  visible: boolean;
  onClose: () => void;
};

export const NewReminderModal = ({ visible, onClose }: NewReminderModalProps) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [repeat, setRepeat] = useState('Does not repeat');
  const [notifyPush, setNotifyPush] = useState(false);
  const [notifyInApp, setNotifyInApp] = useState(false);
  
  const handleCreate = () => {
    // Handle reminder creation
    console.log({ title, date, time, notes, repeat, notifyPush, notifyInApp });
    onClose();
  };
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>New Reminder</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color="#8E8E93" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="What needs to be done?"
              value={title}
              onChangeText={setTitle}
            />
          </View>
          
          <View style={styles.dateTimeContainer}>
            <View style={[styles.formGroup, styles.dateField]}>
              <Text style={styles.label}>Date</Text>
              <TouchableOpacity style={styles.dateInput}>
                <TextInput
                  style={styles.dateText}
                  placeholder="Select date"
                  value={date}
                  onChangeText={setDate}
                  editable={false}
                />
                <Calendar size={20} color="#8E8E93" />
              </TouchableOpacity>
            </View>
            
            <View style={[styles.formGroup, styles.timeField]}>
              <Text style={styles.label}>Time</Text>
              <TouchableOpacity style={styles.dateInput}>
                <TextInput
                  style={styles.dateText}
                  placeholder="Select time"
                  value={time}
                  onChangeText={setTime}
                  editable={false}
                />
                <Clock size={20} color="#8E8E93" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Add notes..."
              multiline
              numberOfLines={4}
              value={notes}
              onChangeText={setNotes}
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Repeat</Text>
            <TouchableOpacity style={styles.selectInput}>
              <Text style={styles.selectText}>{repeat}</Text>
              <ChevronDown size={20} color="#8E8E93" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Notifications</Text>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity 
                style={styles.checkboxRow}
                onPress={() => setNotifyPush(!notifyPush)}
              >
                <View style={[
                  styles.checkbox,
                  notifyPush && styles.checkboxChecked
                ]}>
                  {notifyPush && <Check size={14} color="white" />}
                </View>
                <Text style={styles.checkboxLabel}>Push notification</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.checkboxRow}
                onPress={() => setNotifyInApp(!notifyInApp)}
              >
                <View style={[
                  styles.checkbox,
                  notifyInApp && styles.checkboxChecked
                ]}>
                  {notifyInApp && <Check size={14} color="white" />}
                </View>
                <Text style={styles.checkboxLabel}>In-app alert</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.createButton}
            onPress={handleCreate}
          >
            <Text style={styles.createButtonText}>Create Reminder</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Check component for checkboxes
const Check = ({ size, color }) => (
  <View style={{ 
    width: size, 
    height: size, 
    alignItems: 'center',
    justifyContent: 'center' 
  }}>
    <Text style={{ color, fontSize: size - 4 }}>✓</Text>
  </View>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1C1C1E',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1C1C1E',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateField: {
    flex: 1,
    marginRight: 8,
  },
  timeField: {
    flex: 1,
    marginLeft: 8,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
  },
  dateText: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1C1C1E',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  selectInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  selectText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1C1C1E',
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#8E8E93',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkboxLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#1C1C1E',
  },
  createButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  createButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: 'white',
  },
});