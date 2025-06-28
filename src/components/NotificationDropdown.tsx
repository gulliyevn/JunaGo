import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { notificationService, Notification } from '../services/NotificationService';

interface NotificationDropdownProps {
  visible: boolean;
  onClose: () => void;
  position: { top: number; left: number };
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const isTablet = screenWidth >= 768;
const isSmallScreen = screenWidth < 375;

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  visible,
  onClose,
  position,
}) => {
  const { isDark } = useTheme();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(-50));

  useEffect(() => {
    if (visible) {
      setNotifications(notificationService.getNotifications());
      
      // Анимация появления
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Анимация исчезновения
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -50,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }

    // Подписываемся на обновления уведомлений
    const unsubscribe = notificationService.subscribe((updatedNotifications) => {
      setNotifications(updatedNotifications);
    });

    return unsubscribe;
  }, [visible]);

  if (!visible) {
    return null;
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'trip':
        return 'car-outline';
      case 'payment':
        return 'card-outline';
      case 'driver':
        return 'person-outline';
      case 'system':
        return 'settings-outline';
      default:
        return 'notifications-outline';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'trip':
        return '#10B981';
      case 'payment':
        return '#F59E0B';
      case 'driver':
        return '#3B82F6';
      case 'system':
        return '#6B7280';
      default:
        return '#6B7280';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'alert-circle';
      case 'medium':
        return 'information-circle-outline';
      case 'low':
        return 'checkmark-circle-outline';
      default:
        return null;
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Адаптивные размеры
  const dropdownWidth = isTablet ? 400 : screenWidth - 32;
  const maxHeight = screenHeight * 0.7;
  const dropdownLeft = isTablet ? position.left : 16;

  return (
    <>
      {/* Overlay с анимацией */}
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.overlayTouch}
          activeOpacity={1}
          onPress={onClose}
        />
      </Animated.View>

      {/* Notification Center */}
      <Animated.View
        style={[
          styles.dropdown,
          {
            width: dropdownWidth,
            maxHeight: maxHeight,
            top: Platform.OS === 'ios' 
              ? position.top + 60 + (StatusBar.currentHeight || 0)
              : position.top + 80,
            left: dropdownLeft,
            backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Header */}
        <View style={[styles.header, isDark && styles.headerDark]}>
          <View style={styles.headerLeft}>
            <Ionicons 
              name="notifications" 
              size={24} 
              color={isDark ? '#F9FAFB' : '#1F2937'} 
            />
            <Text style={[styles.headerTitle, isDark && styles.headerTitleDark]}>
              Центр уведомлений
            </Text>
          </View>
          <View style={styles.headerRight}>
            {unreadCount > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadBadgeText}>
                  {unreadCount > 99 ? '99+' : unreadCount}
                </Text>
              </View>
            )}
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={onClose}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons 
                name="close" 
                size={24} 
                color={isDark ? '#9CA3AF' : '#6B7280'} 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={[styles.quickActions, isDark && styles.quickActionsDark]}>
          <TouchableOpacity 
            style={[styles.quickActionButton, isDark && styles.quickActionButtonDark]}
            onPress={() => notificationService.markAllAsRead()}
          >
            <Ionicons name="checkmark-done" size={16} color="#3B82F6" />
            <Text style={styles.quickActionText}>Прочитать все</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.quickActionButton, isDark && styles.quickActionButtonDark]}
            onPress={() => console.log('Filter notifications')}
          >
            <Ionicons name="filter" size={16} color="#3B82F6" />
            <Text style={styles.quickActionText}>Фильтр</Text>
          </TouchableOpacity>
        </View>

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons 
              name="notifications-off-outline" 
              size={48} 
              color={isDark ? '#6B7280' : '#9CA3AF'} 
            />
            <Text style={[styles.emptyStateText, isDark && styles.emptyStateTextDark]}>
              Нет уведомлений
            </Text>
            <Text style={[styles.emptyStateSubtext, isDark && styles.emptyStateSubtextDark]}>
              Все новые уведомления появятся здесь
            </Text>
          </View>
        ) : (
          <ScrollView 
            style={styles.notificationsList} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.notificationsContent}
          >
            {notifications.map((notification, index) => (
              <TouchableOpacity
                key={notification.id}
                style={[
                  styles.notificationItem,
                  isDark && styles.notificationItemDark,
                  !notification.isRead && styles.unreadNotification,
                  index === notifications.length - 1 && styles.lastNotificationItem,
                ]}
                onPress={() => {
                  notificationService.markAsRead(notification.id);
                  console.log('Notification pressed:', notification.id);
                }}
                activeOpacity={0.7}
              >
                <View style={styles.notificationContent}>
                  {/* Icon with priority indicator */}
                  <View style={styles.iconContainer}>
                    <View
                      style={[
                        styles.notificationIcon,
                        { backgroundColor: getNotificationColor(notification.type) + '15' },
                      ]}
                    >
                      <Ionicons
                        name={getNotificationIcon(notification.type) as any}
                        size={20}
                        color={getNotificationColor(notification.type)}
                      />
                    </View>
                    {notification.priority === 'high' && (
                      <View style={styles.priorityIndicator}>
                        <Ionicons name="alert-circle" size={12} color="#EF4444" />
                      </View>
                    )}
                  </View>

                  {/* Content */}
                  <View style={styles.notificationText}>
                    <View style={styles.notificationHeader}>
                      <Text
                        style={[
                          styles.notificationTitle,
                          isDark && styles.notificationTitleDark,
                          !notification.isRead && styles.unreadTitle,
                        ]}
                        numberOfLines={1}
                      >
                        {notification.title}
                      </Text>
                      <Text style={[styles.notificationTime, isDark && styles.notificationTimeDark]}>
                        {notificationService.formatTime(notification.time)}
                      </Text>
                    </View>

                    <Text
                      style={[
                        styles.notificationMessage,
                        isDark && styles.notificationMessageDark,
                      ]}
                      numberOfLines={isSmallScreen ? 2 : 3}
                    >
                      {notification.message}
                    </Text>

                    {/* Action buttons for unread notifications */}
                    {!notification.isRead && (
                      <View style={styles.notificationActions}>
                        <TouchableOpacity
                          style={styles.actionButton}
                          onPress={() => notificationService.markAsRead(notification.id)}
                        >
                          <Ionicons name="checkmark" size={14} color="#10B981" />
                          <Text style={styles.actionButtonText}>Прочитано</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>

                  {/* Unread indicator */}
                  {!notification.isRead && <View style={styles.unreadIndicator} />}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Footer */}
        <View style={[styles.footer, isDark && styles.footerDark]}>
          <TouchableOpacity 
            style={styles.footerButton} 
            onPress={() => console.log('View all notifications')}
          >
            <Text style={styles.footerText}>Показать все уведомления</Text>
            <Ionicons name="chevron-forward" size={16} color="#3B82F6" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1000,
  },
  overlayTouch: {
    flex: 1,
  },
  dropdown: {
    position: 'absolute',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 25,
    zIndex: 1001,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    backgroundColor: '#FAFAFA',
  },
  headerDark: {
    borderBottomColor: '#374151',
    backgroundColor: '#111827',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 12,
  },
  headerTitleDark: {
    color: '#F9FAFB',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unreadBadge: {
    backgroundColor: '#EF4444',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  unreadBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  closeButton: {
    padding: 4,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    backgroundColor: '#FAFAFA',
  },
  quickActionsDark: {
    borderBottomColor: '#374151',
    backgroundColor: '#111827',
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  quickActionButtonDark: {
    backgroundColor: '#374151',
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
    marginLeft: 6,
  },
  notificationsList: {
    flex: 1,
  },
  notificationsContent: {
    paddingBottom: 8,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    textAlign: 'center',
  },
  emptyStateTextDark: {
    color: '#D1D5DB',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 20,
  },
  emptyStateSubtextDark: {
    color: '#9CA3AF',
  },
  notificationItem: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  notificationItemDark: {
    backgroundColor: '#374151',
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
    backgroundColor: '#F8FAFC',
  },
  lastNotificationItem: {
    marginBottom: 16,
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    position: 'relative',
    marginRight: 12,
  },
  notificationIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priorityIndicator: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationText: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  notificationTitleDark: {
    color: '#F9FAFB',
  },
  unreadTitle: {
    fontWeight: '700',
  },
  notificationTime: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  notificationTimeDark: {
    color: '#6B7280',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationMessageDark: {
    color: '#D1D5DB',
  },
  notificationActions: {
    flexDirection: 'row',
    marginTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
    marginLeft: 4,
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
    marginLeft: 8,
    marginTop: 4,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: '#FAFAFA',
  },
  footerDark: {
    borderTopColor: '#374151',
    backgroundColor: '#111827',
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
    marginRight: 8,
  },
});

export default NotificationDropdown; 