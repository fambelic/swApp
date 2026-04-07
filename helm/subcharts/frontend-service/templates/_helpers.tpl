{{- define "frontend-service.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "frontend-service.namePrefix" -}}
{{- default "swapp" .Values.global.namePrefix -}}
{{- end -}}

{{- define "frontend-service.appName" -}}
{{- printf "%s-%s" (include "frontend-service.namePrefix" .) (default "frontend" .Values.componentName) | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "frontend-service.fullname" -}}
{{- printf "%s-%s-%s" .Release.Name (include "frontend-service.namePrefix" .) (default "frontend" .Values.componentName) | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "frontend-service.labels" -}}
helm.sh/chart: {{ include "frontend-service.chart" . }}
app.kubernetes.io/name: {{ include "frontend-service.appName" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/component: {{ default "frontend" .Values.componentName }}
app.kubernetes.io/part-of: {{ include "frontend-service.namePrefix" . }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{- define "frontend-service.selectorLabels" -}}
app.kubernetes.io/name: {{ include "frontend-service.appName" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}
