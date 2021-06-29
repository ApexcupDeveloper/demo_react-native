import React, { ComponentProps } from 'react';
import Button from './Button';
import { Story } from '@storybook/react';

export default {
    title: 'Button',
    component: Button,
};

const Template: Story<ComponentProps<typeof Button>> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
};
Default.parameters = {
    docs: {
        loading: 'string'
    }
}
export const Custom = Template.bind({});
Custom.args = {
    loading: false,
    title: 'Custom Button',
    loadingColor: '#1683e4',
    buttonStyle: {
        width: '100%',
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#1683e4'
    },
    textStyle: {
        fontSize: 16,
        color: '#1683e4'
    },
};
Custom.argTypes = {
    loading: {
        description: 'boolean?',
        defaultValue: {
            summary: 'false',
        }
    },
    title: {
        description: 'string?',
        defaultValue: {
            summary: 'Button'
        }
    },
    loadingColor: {
        description: 'color?',
        defaultValue: {
            summary: 'white'
        },
        control: {
            type: 'color'
        }
    },
    buttonStyle: {
        description: 'View.style?',
        defaultValue: {
            summary: `
            {
                width: '100%',
                height: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#1683e4',
                marginVertical: 10,
                borderRadius: 10,
            }
            `
        },
    },
    textStyle: {
        description: 'Text.style?',
        defaultValue: {
            summary: `
            {
                fontSize: 16,
                color: 'white'
            }
            `
        },
    }
}
