{{- define "rabbit-service.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "rabbit-service.namePrefix" -}}
{{- default "swapp" .Values.global.namePrefix -}}
{{- end -}}

{{- define "rabbit-service.appName" -}}
{{- printf "%s-%s" (include "rabbit-service.namePrefix" .) (default "queue" .Values.componentName) | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "rabbit-service.fullname" -}}
{{- printf "%s-%s-%s" .Release.Name (include "rabbit-service.namePrefix" .) (default "queue" .Values.componentName) | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "rabbit-service.labels" -}}
helm.sh/chart: {{ include "rabbit-service.chart" . }}
app.kubernetes.io/name: {{ include "rabbit-service.appName" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/component: {{ default "queue" .Values.componentName }}
app.kubernetes.io/part-of: {{ include "rabbit-service.namePrefix" . }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{- define "rabbit-service.selectorLabels" -}}
app.kubernetes.io/name: {{ include "rabbit-service.appName" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}
