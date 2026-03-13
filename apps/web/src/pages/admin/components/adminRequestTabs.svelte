<script lang="ts">
import { Icon } from '@demotivator/ui';

interface Props {
activeTab: 'pending' | 'approved' | 'rejected' | 'recent';
pendingCount: number;
approvedCount: number;
rejectedCount: number;
onTabChange: (tab: 'pending' | 'approved' | 'rejected' | 'recent') => void;
}

const {
	activeTab,
	pendingCount,
	approvedCount,
	rejectedCount,
	onTabChange
}: Props = $props();
</script>

<ul class="nav nav-tabs card-header-tabs" role="tablist">
<li class="nav-item" role="presentation">
<button
class={`nav-link ${activeTab === 'pending' ? 'active' : ''}`}
onclick={() => onTabChange('pending')}
type="button"
>
<Icon name="clock-history" /> Pending ({pendingCount})
</button>
</li>
<li class="nav-item" role="presentation">
<button
class={`nav-link ${activeTab === 'approved' ? 'active' : ''}`}
onclick={() => onTabChange('approved')}
type="button"
>
<Icon name="check-circle" /> Approved ({approvedCount})
</button>
</li>
<li class="nav-item" role="presentation">
<button
class={`nav-link ${activeTab === 'rejected' ? 'active' : ''}`}
onclick={() => onTabChange('rejected')}
type="button"
>
<Icon name="x-circle" /> Rejected ({rejectedCount})
</button>
</li>
<li class="nav-item" role="presentation">
<button
class={`nav-link ${activeTab === 'recent' ? 'active' : ''}`}
onclick={() => onTabChange('recent')}
type="button"
>
<Icon name="list-ul" /> Recent Activity
</button>
</li>
</ul>
