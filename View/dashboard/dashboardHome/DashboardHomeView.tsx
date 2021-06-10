import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import globalStyles from '../../../globalStyle';
import {Project, Tasks, userCreateModel} from '../../../models/userModel';
import {ThemeItem} from '../../../themes/EBikeGoLightTheme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import moment from 'moment';
import {Picker} from '@react-native-community/picker';
import {updateStatus} from '../../../service';
const DashboardHomeView = ({
  user,
  craeteProject,
  project,
  ProjectDetails,
  myTask,
  actionTigger,
}: DashboardHomeViewProps) => {
  const [ProjectModal, SetProjectModal] = useState<boolean>();
  const theme: ThemeItem = Object(useTheme());
  const craeteProjects = (data: string) => {
    craeteProject(data);
    SetProjectModal(false);
  };
  return (
    <View style={{flex: 1}}>
      <Header user={user} />
      <ScrollView style={{marginBottom: 20}}>
        <ProjectSection
          SetProjectModal={SetProjectModal}
          project={project}
          ProjectDetails={ProjectDetails}
        />
        <MyTasks myTask={myTask} actionTigger={actionTigger} />
      </ScrollView>
      <ProjectCreateModel
        ProjectModal={ProjectModal}
        SetProjectModal={SetProjectModal}
        craeteProject={craeteProjects}
      />
    </View>
  );
};

export default DashboardHomeView;

interface DashboardHomeViewProps {
  user?: userCreateModel;
  craeteProject?: any;
  project?: Project[];
  ProjectDetails?: any;
  myTask?: Tasks[];
  actionTigger?: any;
}

const ProjectSection = (props: any) => {
  const theme: ThemeItem = Object(useTheme());
  return (
    <View>
      <View
        style={{
          padding: 5,
          backgroundColor: theme.colors.primaryTint,
          width: '40%',
          marginTop: 10,
          borderTopRightRadius: theme.roundness.mediumRoundness,
          borderBottomRightRadius: theme.roundness.mediumRoundness,
        }}>
        <Text
          style={[
            {
              color: theme.colors.primaryConstrast,
              fontSize: theme.fonts.smallFont,
              fontWeight: 'bold',
            },
            globalStyles.fontFamily,
          ]}>
          My Projects
        </Text>
      </View>
      <ScrollView
        horizontal={true}
        style={{paddingHorizontal: 5, marginTop: 10}}>
        <CreateProject SetProjectModal={props.SetProjectModal} />
        {!!props?.project &&
          props?.project.map((item: Project) => (
            <Projects
              item={item}
              key={item.project_id}
              ProjectDetails={props.ProjectDetails}
            />
          ))}
      </ScrollView>
    </View>
  );
};

const CreateProject = (props: any) => {
  const theme: ThemeItem = Object(useTheme());
  return (
    <TouchableOpacity
      onPress={() => props.SetProjectModal(true)}
      style={[
        {
          height: 120,
          width: 120,
          backgroundColor: theme.colors.cardalt,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          borderRadius: theme.roundness.mediumRoundness,
          margin: 2,
        },
      ]}>
      <Ionicons
        color={theme.colors.primary}
        name={'add-outline'}
        size={theme.icons.massiveIcon}
        style={{marginLeft: 10}}
      />
      <Text
        style={{color: theme.colors.primary, fontSize: theme.fonts.smallFont}}>
        Create Project
      </Text>
    </TouchableOpacity>
  );
};

const Header = (props: any) => {
  const theme: ThemeItem = Object(useTheme());
  return (
    <View
      style={{
        height: 55,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        paddingLeft: 20,
      }}>
      <Text
        style={[
          {
            fontSize: theme.fonts.mediumFont,
            color: theme.colors.primaryConstrast,
          },
          globalStyles.fontFamily,
        ]}>
        Hello, {props?.user?.user_name}
      </Text>
    </View>
  );
};

const MyTasks = (props: any) => {
  const theme: ThemeItem = Object(useTheme());
  return (
    <View>
      <View
        style={{
          padding: 5,
          backgroundColor: theme.colors.primaryTint,
          width: '40%',
          marginTop: 10,
          borderTopRightRadius: theme.roundness.mediumRoundness,
          borderBottomRightRadius: theme.roundness.mediumRoundness,
        }}>
        <Text
          style={[
            {
              color: theme.colors.primaryConstrast,
              fontSize: theme.fonts.smallFont,
              fontWeight: 'bold',
            },
            globalStyles.fontFamily,
          ]}>
          My Tasks
        </Text>
      </View>
      {!!props?.myTask &&
        props?.myTask.map((item: any) => (
          <TaskItem
            key={item.task_id}
            item={item}
            actionTigger={props.actionTigger}
          />
        ))}
    </View>
  );
};

export const TaskItem = (props: any) => {
  const [modal, SetModal] = useState<boolean>(false);
  const theme: ThemeItem = Object(useTheme());
  return (
    <View
      style={{
        minHeight: 55,
        backgroundColor: theme.colors.cardalt,
        margin: 5,
        padding: 5,
        borderRadius: theme.roundness.smallRoundness,
      }}>
      <ChangeStatus
        SetModal={SetModal}
        modal={modal}
        status={props?.item?.status}
        actionTigger={(data: number) =>
          props.actionTigger({task_id: props?.item?.task_id, status: data})
        }
      />
      <View>
        <Text
          style={[
            {
              fontSize: theme.fonts.mediumFont,
              color: theme.colors.primary,
              fontWeight: 'bold',
            },
            globalStyles.fontFamily,
          ]}>
          {props?.item?.task_title}
        </Text>
      </View>
      <View>
        <Text
          style={[
            {
              fontSize: theme.fonts.extremeSmallFont,
              color: theme.colors.darkTint,
            },
            globalStyles.fontFamily,
          ]}>
          {props?.item?.task_desc}
        </Text>
      </View>
      <View>
        <Text
          style={[
            {
              fontSize: theme.fonts.smallFont,
              color: theme.colors.primaryTint,
            },
            globalStyles.fontFamily,
          ]}>
          {moment(props?.item?.date).format('LLL')}
        </Text>
      </View>
      <View>
        <Text
          style={[
            {
              fontSize: theme.fonts.smallFont,
              color: theme.colors.tertiary,
              fontWeight: 'bold',
            },
            globalStyles.fontFamily,
          ]}>
          {props?.item?.status == 1
            ? 'Created'
            : props?.item?.status == 2
            ? 'In Progress'
            : 'Completed'}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => SetModal(true)}
        style={[
          {
            marginTop: 10,
            backgroundColor: theme.colors.messageToast,
            justifyContent: 'center',
            alignItems: 'center',
            width: '45%',
            marginBottom: 5,
            borderRadius: theme.roundness.smallRoundness,
          },
          globalStyles.boxShadow,
        ]}>
        <Text
          style={[
            {fontSize: theme.fonts.smallFont, padding: 5},
            globalStyles.fontFamily,
          ]}>
          Change Status
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Projects = (props: any) => {
  const theme: ThemeItem = Object(useTheme());
  return (
    <TouchableOpacity
      onPress={() => props.ProjectDetails(props?.item?.project_id)}
      style={[
        {
          height: 120,
          width: 120,
          backgroundColor: theme.colors.cardalt,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          borderRadius: theme.roundness.mediumRoundness,
          margin: 2,
        },
      ]}>
      <Text
        style={{color: theme.colors.primary, fontSize: theme.fonts.smallFont}}>
        {props?.item?.project_name}
      </Text>
    </TouchableOpacity>
  );
};

const ProjectCreateModel = (props: any) => {
  const theme: ThemeItem = Object(useTheme());
  const [ProjectName, SetProjectName] = useState<string>();
  const styles = StyleSheet.create({
    bottomModal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
  });
  return (
    <Modal
      isVisible={props.ProjectModal}
      backdropOpacity={0.3}
      animationInTiming={1000}
      animationOutTiming={1000}
      collapsable={true}
      backdropTransitionInTiming={1000}
      backdropTransitionOutTiming={1000}
      style={styles.bottomModal}
      onBackdropPress={() => props.SetProjectModal(false)}>
      <View
        style={{
          height: 400,
          backgroundColor: theme.colors.primaryConstrast,
          borderTopLeftRadius: theme.roundness.mediumRoundness,
          borderTopRightRadius: theme.roundness.mediumRoundness,
        }}>
        <View
          style={{
            height: 55,
            backgroundColor: theme.colors.primary,
            borderTopLeftRadius: theme.roundness.mediumRoundness,
            borderTopRightRadius: theme.roundness.mediumRoundness,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: theme.fonts.mediumFont,
              color: theme.colors.primaryConstrast,
            }}>
            Create Project
          </Text>
          <Ionicons
            onPress={() => props.SetProjectModal(false)}
            color={theme.colors.secondaryTint}
            name={'close-outline'}
            size={theme.icons.mediumIcon}
            style={{position: 'absolute', top: 10, right: 20}}
          />
        </View>
        <View
          style={{
            flex: 1,
            margin: 10,
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <View
            style={{
              marginTop: 20,
              height: 50,
              width: '100%',
              borderColor: theme.colors.inputBorder,
              borderWidth: 1,
              borderRadius: theme.roundness.bigRoundness,
            }}>
            <TextInput
              onChangeText={text => SetProjectName(text)}
              value={ProjectName}
              placeholder={'Project Name'}
              style={[
                {
                  fontSize: theme.fonts.mediumFont,
                  paddingLeft: 10,
                },
                globalStyles.fontFamily,
              ]}></TextInput>
          </View>
          <TouchableOpacity
            onPress={() => props.craeteProject(ProjectName)}
            style={[
              {
                width: '50%',
                borderColor: theme.colors.inputBorder,
                borderWidth: 1,
                borderRadius: theme.roundness.bigRoundness,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 20,
                backgroundColor: theme.colors.primary,
              },
              globalStyles.boxShadow,
            ]}>
            <Text
              style={[
                {
                  fontSize: theme.fonts.bigFont,
                  color: theme.colors.primaryConstrast,
                },
                globalStyles.fontFamily,
              ]}>
              Create Project
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const ChangeStatus = (props: any) => {
  const theme: ThemeItem = Object(useTheme());
  const [Status, SetStatus] = useState<number>(1);
  const styles = StyleSheet.create({
    bottomModal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
  });
  useEffect(() => {
    SetStatus(props.status);
  }, [props.status]);

  return (
    <Modal
      isVisible={props.modal}
      backdropOpacity={0.3}
      animationInTiming={1000}
      animationOutTiming={1000}
      collapsable={true}
      backdropTransitionInTiming={1000}
      backdropTransitionOutTiming={1000}
      style={styles.bottomModal}
      onBackdropPress={() => props.SetModal(false)}>
      <View
        style={{
          height: 400,
          backgroundColor: theme.colors.primaryConstrast,
          borderTopLeftRadius: theme.roundness.mediumRoundness,
          borderTopRightRadius: theme.roundness.mediumRoundness,
        }}>
        <View
          style={{
            height: 55,
            backgroundColor: theme.colors.primary,
            borderTopLeftRadius: theme.roundness.mediumRoundness,
            borderTopRightRadius: theme.roundness.mediumRoundness,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: theme.fonts.mediumFont,
              color: theme.colors.primaryConstrast,
            }}>
            Update Status
          </Text>
          <Ionicons
            onPress={() => props.SetModal(false)}
            color={theme.colors.secondaryTint}
            name={'close-outline'}
            size={theme.icons.mediumIcon}
            style={{position: 'absolute', top: 10, right: 20}}
          />
        </View>
        <View
          style={{
            marginTop: 20,
            minHeight: 50,
            width: '100%',
            borderColor: theme.colors.inputBorder,
            borderWidth: 1,
            borderRadius: theme.roundness.bigRoundness,
          }}>
          <Picker
            onValueChange={value => SetStatus(+value)}
            selectedValue={Status}
            style={{color: theme.colors.placeholderText}}>
            <Picker.Item label={'Created'} value={1} key={1} />
            <Picker.Item label={'In Progress'} value={2} key={2} />
            <Picker.Item label={'Completed'} value={3} key={3} />
          </Picker>
        </View>
        <View
          style={{
            flex: 1,
            margin: 10,
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => (props.actionTigger(Status), props.SetModal(false))}
            style={[
              {
                width: '50%',
                borderColor: theme.colors.inputBorder,
                borderWidth: 1,
                borderRadius: theme.roundness.bigRoundness,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 20,
                backgroundColor: theme.colors.primary,
              },
              globalStyles.boxShadow,
            ]}>
            <Text
              style={[
                {
                  fontSize: theme.fonts.bigFont,
                  color: theme.colors.primaryConstrast,
                },
                globalStyles.fontFamily,
              ]}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
