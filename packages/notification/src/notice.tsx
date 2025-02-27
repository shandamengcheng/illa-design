import { forwardRef, useMemo, useRef, useEffect, MouseEvent } from "react"
import { NoticeProps } from "./interface"
import {
  applyNotification,
  applyNotificationTitle,
  applyNotificationAction,
  applyNotificationCloseBtn,
  applyNotificationIcon,
  applyMessage,
  applyMessageIcon,
  applyMessageContent,
  applyMessageCloseBtn,
  applyContentWrapperStyle,
  applyContentStyle,
  applyNotificationContentStyle,
  applyNotificationLeftStyle,
} from "./style"
import {
  RightIcon,
  ErrorIcon,
  WarningCircleIcon,
  CloseIcon,
  InfoCircleIcon,
  LoadingIcon,
} from "@illa-design/icon"
import { AlertType } from "@illa-design/alert"
import { Notification } from "./notification"
const iconMap = {
  info: <InfoCircleIcon />,
  success: <RightIcon />,
  warning: <WarningCircleIcon />,
  error: <ErrorIcon />,
  loading: <LoadingIcon spin={true} />,
  normal: void 0,
}

export const Notice = forwardRef<HTMLDivElement, NoticeProps>((props, ref) => {
  const {
    title,
    action,
    closable,
    type = "info",
    noticeType = "Notification",
    content,
    icon,
    showIcon = true,
    closeElement,
    duration = 3000,
    position = "topLeft",
    id,
    onMouseEnter,
    onMouseLeave,
    onClose,
    afterClose,
    update,
    removeHook,
    ...restProps
  } = props
  const timerRef = useRef<number | undefined>(undefined)
  useEffect(() => {
    startTimer()
    return () => {
      removeTimer()
    }
  }, [update, duration])
  const handleClose = () => {
    onClose && onClose()
    removeHook && removeHook(id as string)
  }
  const removeTimer = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
      timerRef.current = void 0
    }
  }
  const startTimer = () => {
    if (duration > 0) {
      timerRef.current = window.setTimeout(() => {
        handleClose()
        removeTimer()
      }, duration)
    }
  }

  const renderIcon = useMemo(() => {
    return icon ? icon : iconMap[type]
  }, [icon, type])

  const handleMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
    onMouseEnter && onMouseEnter(event)
    removeTimer()
  }
  const handleMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
    onMouseLeave && onMouseLeave(event)
    startTimer()
  }

  if (noticeType === "Message") {
    return (
      <div
        css={applyMessage(closable, showIcon && !!renderIcon)}
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...restProps}
      >
        {showIcon && renderIcon && (
          <div css={applyMessageIcon(type)}>{renderIcon}</div>
        )}
        <div css={applyMessageContent}>{content}</div>
        {closable && (
          <div css={applyMessageCloseBtn} onClick={handleClose}>
            {closeElement || <CloseIcon />}
          </div>
        )}
      </div>
    )
  }
  return (
    <div
      css={applyNotification(closable)}
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...restProps}
    >
      <div css={applyContentWrapperStyle}>
        {showIcon && renderIcon && (
          <div css={applyNotificationLeftStyle}>
            {showIcon && renderIcon && (
              <span css={applyNotificationIcon(type as AlertType)}>
                {renderIcon}
              </span>
            )}
          </div>
        )}
        <div css={applyContentStyle}>
          {title && <div css={applyNotificationTitle}>{title}</div>}
          {content && <div css={applyNotificationContentStyle}>{content}</div>}
        </div>
      </div>
      {action && <div css={applyNotificationAction}>{action}</div>}
      {closable && (
        <div css={applyNotificationCloseBtn} onClick={handleClose}>
          {closeElement || <CloseIcon />}
        </div>
      )}
    </div>
  )
})

Notice.displayName = "Notice"
