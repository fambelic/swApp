{{- define "registration-service.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "registration-service.namePrefix" -}}
{{- default "swapp" .Values.global.namePrefix -}}
{{- end -}}

{{- define "registration-service.appName" -}}
{{- printf "%s-%s" (include "registration-service.namePrefix" .) (default "auth" .Values.componentName) | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "registration-service.fullname" -}}
{{- printf "%s-%s-%s" .Release.Name (include "registration-service.namePrefix" .) (default "auth" .Values.componentName) | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "registration-service.peerFullname" -}}
{{- $root := .root -}}
{{- $component := .component -}}
{{- printf "%s-%s-%s" $root.Release.Name (default "swapp" $root.Values.global.namePrefix) $component | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "registration-service.labels" -}}
helm.sh/chart: {{ include "registration-service.chart" . }}
app.kubernetes.io/name: {{ include "registration-service.appName" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/component: {{ default "auth" .Values.componentName }}
app.kubernetes.io/part-of: {{ include "registration-service.namePrefix" . }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{- define "registration-service.selectorLabels" -}}
app.kubernetes.io/name: {{ include "registration-service.appName" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}
