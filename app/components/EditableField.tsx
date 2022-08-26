import {
  ActionIcon,
  Group,
  type MantineSize,
  Text,
  TextInput,
  type BoxProps,
} from "@mantine/core";
import { useToggle, useClickOutside } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons";

type EditableFieldProps = BoxProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
    size?: MantineSize;
    label: string;
  };

const EditableField: React.FC<EditableFieldProps> = ({ ...props }) => {
  const [isEditable, toggleEditable] = useToggle([false, true]);
  const ref = useClickOutside<HTMLInputElement>(() => toggleEditable(false));

  return (
    <Group>
      <Group grow>
        {!isEditable ? (
          <Text {...props}>
            <b>{props.label}:</b> {props.defaultValue}
          </Text>
        ) : (
          <TextInput {...props} autoFocus ref={ref} />
        )}
      </Group>
      {!isEditable && (
        <ActionIcon onClick={() => toggleEditable()}>
          <IconEdit />
        </ActionIcon>
      )}
    </Group>
  );
};

export default EditableField;
